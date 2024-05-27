import { Inject, Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { OrderModel } from '../../../domain/models/orders.model';
import { OrderRepositoryPort } from '../../../domain/ports/order.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class SetOrderToCancelledUseCase implements IUseCase<OrderModel> {
  constructor(
    @Inject('OrderRepositoryPort')
    private readonly orderRepository: OrderRepositoryPort,
  ) {}
  async execute(orderId: number): Promise<OrderModel> {
    const order = await this.orderRepository.getById(orderId);

    order.status = Status.CANCELLED;

    const updatedOrder = await this.orderRepository.update(orderId, order);
    return updatedOrder;
  }
}
