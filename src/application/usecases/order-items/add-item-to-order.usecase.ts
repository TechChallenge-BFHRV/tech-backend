import { Inject, Injectable } from '@nestjs/common';
import { OrderItemModel } from '../../../domain/models/order-items.model';
import { OrderItemRepositoryPort } from '../../../domain/ports/order-item.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class AddItemToOrderUseCase implements IUseCase<OrderItemModel> {
  constructor(
    @Inject('OrderItemRepositoryPort')
    private readonly orderItemRepository: OrderItemRepositoryPort,
  ) {}
  async execute(orderItem: OrderItemModel): Promise<OrderItemModel> {
    const createdOrderItem = await this.orderItemRepository.create(orderItem);
    return createdOrderItem;
  }
}
