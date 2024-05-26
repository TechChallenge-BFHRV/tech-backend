import { Inject, Injectable } from '@nestjs/common';
import { Step } from '@prisma/client';
import { OrderModel } from '../../../domain/models/orders.model';
import { OrderRepositoryPort } from '../../../domain/ports/order.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class OrderStepForwardUseCase implements IUseCase<OrderModel> {
  constructor(
    @Inject('OrderRepositoryPort')
    private readonly orderRepository: OrderRepositoryPort,
  ) {}
  async execute(orderId: number): Promise<OrderModel> {
    const order = await this.orderRepository.getById(orderId);
    let nextStep: Step;
    switch (order.step) {
      case 'START':
        nextStep = 'MEAL';
        break;
      case 'MEAL':
        nextStep = 'SIDE_DISH';
        break;
      case 'SIDE_DISH':
        nextStep = 'DRINK';
        break;
      case 'DRINK':
        nextStep = 'DESERT';
        break;
      case 'DESERT':
        nextStep = 'CHECKOUT';
        break;
      case 'CHECKOUT':
        nextStep = 'PAYMENT_REQUEST';
        break;
      case 'PAYMENT_REQUEST':
        nextStep = 'COMPLETED';
        break;
      default:
        nextStep = 'START';
    }
    const updatedOrder = await this.orderRepository.orderStepForward(
      orderId,
      nextStep,
    );
    return updatedOrder;
  }
}
