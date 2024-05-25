import { Inject, Injectable } from '@nestjs/common';
import { Status, Step } from '@prisma/client';
import { OrderModel } from '../../../domain/models/orders.model';
import { OrderRepositoryPort } from '../../../domain/ports/order.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class CreateOrderUseCase implements IUseCase<OrderModel> {
  constructor(
    @Inject('OrderRepositoryPort')
    private readonly orderRepository: OrderRepositoryPort,
  ) {}
  async execute(order: OrderModel): Promise<OrderModel> {
    order.step = Step.START;
    order.status = Status.STARTED;

    const createdOrder = await this.orderRepository.create(order);

    return createdOrder;
  }
}
