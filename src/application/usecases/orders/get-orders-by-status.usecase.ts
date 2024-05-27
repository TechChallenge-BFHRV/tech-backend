import { Inject, Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { OrderModel } from '../../../domain/models/orders.model';
import { OrderRepositoryPort } from '../../../domain/ports/order.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class GetOrdersByStatusUseCase implements IUseCase<OrderModel[]> {
  constructor(
    @Inject('OrderRepositoryPort')
    private readonly orderRepository: OrderRepositoryPort,
  ) {}
  async execute(status: Status): Promise<OrderModel[]> {
    const filteredOrders = await this.orderRepository.getOrdersByStatus(status);
    return filteredOrders;
  }
}
