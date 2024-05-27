import { Inject, Injectable } from '@nestjs/common';
import { Step } from '@prisma/client';
import { OrderModel } from '../../../domain/models/orders.model';
import { OrderRepositoryPort } from '../../../domain/ports/order.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class OrderStepBackwardUseCase implements IUseCase<OrderModel> {
  constructor(
    @Inject('OrderRepositoryPort')
    private readonly orderRepository: OrderRepositoryPort,
  ) {}
  async execute(orderId: number): Promise<OrderModel> {
    const order = await this.orderRepository.getById(orderId);
    let previousStep: Step;
    switch (order.step) {
      case 'PAYMENT_REQUEST':
        previousStep = 'CHECKOUT';
        break;
      case 'CHECKOUT':
        previousStep = 'DESERT';
        break;
      case 'DESERT':
        previousStep = 'DRINK';
        break;
      case 'DRINK':
        previousStep = 'SIDE_DISH';
        break;
      case 'SIDE_DISH':
        previousStep = 'MEAL';
        break;
      case 'MEAL':
        previousStep = 'START';
        break;
      default:
        previousStep = 'START';
    }
    const updatedOrder = await this.orderRepository.orderStepUpdate(
      orderId,
      previousStep,
    );
    return updatedOrder;
  }
}
