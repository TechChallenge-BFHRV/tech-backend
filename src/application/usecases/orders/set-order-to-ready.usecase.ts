import { Inject, Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { OrderModel } from '../../../domain/models/orders.model';
import { OrderRepositoryPort } from '../../../domain/ports/order.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class SetOrderToReadyUseCase implements IUseCase<OrderModel> {
  constructor(
    @Inject('OrderRepositoryPort')
    private readonly orderRepository: OrderRepositoryPort,
  ) {}
  async execute(orderId: number): Promise<OrderModel> {
    const order = await this.orderRepository.getById(orderId);

    if (order.status !== Status.IN_PROGRESS) {
      throw new Error('Order must be in IN_PROGRESS status to set it to READY');
    }

    order.status = Status.READY;

    const updatedOrder = await this.orderRepository.update(orderId, order);
    return updatedOrder;
  }
}
