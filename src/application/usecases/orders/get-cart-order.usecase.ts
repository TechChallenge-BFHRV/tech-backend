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

    if (!order) {
      throw new Error('Order not found');
    }

    order = await this.calculateFinalPrice(order);

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

    // Assuming the final price is stored in a property named `finalPrice`
    order.finalPrice = Math.round(discountedPrice * 100) / 100;

    return order;
  }

  async getComboDiscount(order: OrderModel): Promise<number> {
    const minimumComboCategory = 3;
    const maxDiscount = 0.15; // Maximum 15% discount
    const discountPerCombo = 0.05; // 5% discount per combo

    // combo have 3 items of different types, need to check if the order has 3 different items and then apply cumulative 5% discount for every combo

    // count the number of types item in the order.OrderItems.Item
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

    // Calculate the number of complete combos
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

    // Calculate total discount, capped at the maximum discount
    const totalDiscount = Math.min(comboCount * discountPerCombo, maxDiscount);

    return totalDiscount;
  }
}
