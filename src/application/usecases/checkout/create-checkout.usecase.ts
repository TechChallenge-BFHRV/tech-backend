import { Inject, Injectable } from '@nestjs/common';
import { CheckoutStatus, Status } from '@prisma/client';
import { CheckoutModel } from '../../../domain/models/checkout.model';
import { CheckoutRepositoryPort } from '../../../domain/ports/checkout.repository.port';
import { OrderRepositoryPort } from '../../../domain/ports/order.repository.port';
import { PaymentGatewayPort } from '../../../domain/ports/payment.gateway.port';
import { OrderQueueUseCase } from '../orders/queue/order-queue.usecase';
import { IUseCase } from '../usecase';

@Injectable()
export class CreateCheckoutUseCase implements IUseCase<CheckoutModel> {
  constructor(
    @Inject('CheckoutRepositoryPort')
    private readonly checkoutRepository: CheckoutRepositoryPort,
    @Inject('OrderRepositoryPort')
    private readonly orderRepository: OrderRepositoryPort,
    @Inject('PaymentGatewayPort')
    private readonly paymentGateway: PaymentGatewayPort,
    private readonly orderQueueUseCase: OrderQueueUseCase,
  ) {}

  async execute(checkoutRequest: CheckoutModel): Promise<CheckoutModel> {
    const order = await this.orderRepository.getById(checkoutRequest.orderId);

    if (order.status !== 'STARTED') {
      throw new Error('Order must be in STARTED status to create a checkout');
    }

    if (order.orderItems.some((item) => item.isActive) === false) {
      throw new Error('Order must have at least one item to create a checkout');
    }

    checkoutRequest.customerId = order.customerId;
    checkoutRequest.status = CheckoutStatus.PENDING;
    order.status = Status.PENDING;

    await this.orderRepository.update(order.id, order);
    await this.orderQueueUseCase.addOrderToQueue({
      orderId: order.id,
      status: Status.PENDING,
    });

    const createdCheckout =
      await this.checkoutRepository.create(checkoutRequest);

    const paymentSucceed = await this.paymentGateway.execute(order.finalPrice);

    if (paymentSucceed) {
      createdCheckout.status = CheckoutStatus.APPROVED;
      await this.orderQueueUseCase.addOrderToQueue({
        orderId: order.id,
        status: Status.APPROVED,
      });
    } else {
      order.status = Status.CANCELLED;
      createdCheckout.status = CheckoutStatus.REJECTED;
      await this.orderQueueUseCase.addOrderToQueue({
        orderId: order.id,
        status: Status.CANCELLED,
      });
    }

    await this.orderRepository.update(order.id, order);
    await this.checkoutRepository.update(createdCheckout.id, createdCheckout);

    return createdCheckout;
  }
}
