import { Inject, Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { OrderModel } from '../../../domain/models/orders.model';
import { OrderRepositoryPort } from '../../../domain/ports/order.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class SetOrderToFinishedUseCase implements IUseCase<OrderModel> {
  constructor(
    @Inject('OrderRepositoryPort')
    private readonly orderRepository: OrderRepositoryPort,
  ) {}
  async execute(orderId: number): Promise<OrderModel> {
    const order = await this.orderRepository.getById(orderId);

    if (order.status !== Status.READY) {
      throw new Error('Order must be in READY status to set it to FINISHED');
    }

    order.status = Status.FINISHED;

    const updatedOrder = await this.orderRepository.update(orderId, order);
    return updatedOrder;
  }
}
