import { Inject, Injectable } from '@nestjs/common';
import { OrderModel } from '../../../domain/models/orders.model';
import { OrderRepositoryPort } from '../../../domain/ports/order.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class SetOrderCustomerUseCase implements IUseCase<OrderModel> {
  constructor(
    @Inject('OrderRepositoryPort')
    private readonly orderRepository: OrderRepositoryPort,
  ) {}

  async execute(orderId: number, customerId: number): Promise<OrderModel> {
    const updatedOrder = await this.orderRepository.setOrderCustomer(
      orderId,
      customerId,
    );
    return updatedOrder;
  }
}
