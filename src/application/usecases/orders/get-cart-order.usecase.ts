import { Inject, Injectable } from '@nestjs/common';
import { OrderModel } from '../../../domain/models/orders.model';
import { OrderRepositoryPort } from '../../../domain/ports/order.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class GetCartOrderUseCase implements IUseCase<OrderModel> {
  constructor(
    @Inject('OrderRepositoryPort')
    private readonly orderRepository: OrderRepositoryPort,
  ) {}
  async execute(orderId: number): Promise<OrderModel> {
    let order = await this.orderRepository.getById(orderId);

    order = await this.calculateFinalPrice(order);
    order = await this.calculatePreparationTime(order);

    await this.orderRepository.update(order.id, order);

    return order;
  }

  async calculateFinalPrice(order: OrderModel): Promise<OrderModel> {
    const totalPrice = order.orderItems.reduce(
      (acc, item) => item.Item.price + acc,
      0,
    );

    order.totalPrice = totalPrice;

    const comboDiscount = await this.getComboDiscount(order);

    const discountedPrice = totalPrice * (1 - comboDiscount);

    order.finalPrice = Math.round(discountedPrice * 100) / 100;

    return order;
  }

  async calculatePreparationTime(order: OrderModel): Promise<OrderModel> {
    const preparationTime = order.orderItems.reduce(
      (acc, item) => item.Item.preparationTime + acc,
      0,
    );

    order.preparationTime = preparationTime;

    return order;
  }

  async getComboDiscount(order: OrderModel): Promise<number> {
    const minimumComboCategory = 3;
    const maxDiscount = 0.15;
    const discountPerCombo = 0.05;

    const groupedCategory = order.orderItems.reduce((acc, orderItem) => {
      if (!acc[orderItem.Item.category]) {
        acc[orderItem.Item.category] = 0;
      }

      acc[orderItem.Item.category]++;
      return acc;
    }, {});

    const isCombo = Object.keys(groupedCategory).length >= minimumComboCategory;

    if (!isCombo) {
      return 0;
    }

    const categoryCounts: number[] = Object.values(groupedCategory);

    let comboCount = 0;
    while (
      categoryCounts.filter((count) => count > 0).length >= minimumComboCategory
    ) {
      comboCount++;
      for (let i = 0; i < categoryCounts.length; i++) {
        if (categoryCounts[i] > 0) {
          categoryCounts[i]--;
        }
      }
    }

    const totalDiscount = Math.min(comboCount * discountPerCombo, maxDiscount);

    return totalDiscount;
  }
}
