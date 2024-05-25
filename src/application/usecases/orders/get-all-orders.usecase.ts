import { Inject, Injectable } from '@nestjs/common';
import { OrderModel } from '../../../domain/models/orders.model';
import { OrderRepositoryPort } from '../../../domain/ports/order.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class GetAllOrdersUseCase implements IUseCase<OrderModel[]> {
  constructor(
    @Inject('OrderRepositoryPort')
    private readonly orderRepository: OrderRepositoryPort,
  ) {}
  async execute(): Promise<OrderModel[]> {
    const allOrders = await this.orderRepository.getAll();
    return allOrders;
  }
}
