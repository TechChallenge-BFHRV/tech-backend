import { Inject, Injectable } from '@nestjs/common';
import { OrderItemModel } from '../../../domain/models/order-items.model';
import { OrderItemRepositoryPort } from '../../../domain/ports/order-item.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class SetItemToOrderUseCase implements IUseCase<OrderItemModel> {
  constructor(
    @Inject('OrderItemRepositoryPort')
    private readonly orderItemRepository: OrderItemRepositoryPort,
  ) {}
  async execute(orderItemId: number): Promise<OrderItemModel> {
    const setOrderItem =
      await this.orderItemRepository.setOrderItemId(orderItemId);
    return setOrderItem;
  }
}
