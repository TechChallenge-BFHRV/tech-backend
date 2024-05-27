import { Inject, Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { OrderModel } from '../../../domain/models/orders.model';
import { OrderRepositoryPort } from '../../../domain/ports/order.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class SetOrderToPrepareUseCase implements IUseCase<OrderModel> {
  constructor(
    @Inject('OrderRepositoryPort')
    private readonly orderRepository: OrderRepositoryPort,
  ) {}
  async execute(orderId: number): Promise<OrderModel> {
    console.log(`Order ID`, orderId);
    const order = await this.orderRepository.getById(orderId);

    if (order.status !== Status.APPROVED) {
      throw new Error(
        'Order must be in APPROVED status to set it to In Progress',
      );
    }

    order.status = Status.IN_PROGRESS;

    const updatedOrder = await this.orderRepository.update(orderId, order);
    return updatedOrder;
  }
}
