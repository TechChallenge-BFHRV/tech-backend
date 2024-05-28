import { Inject, Injectable } from '@nestjs/common';
import { CheckoutStatus, Status, Step } from '@prisma/client';
import { CheckoutModel } from '../../../domain/models/checkout.model';
import { CheckoutRepositoryPort } from '../../../domain/ports/checkout.repository.port';
import { OrderRepositoryPort } from '../../../domain/ports/order.repository.port';
import { PaymentGatewayPort } from '../../../domain/ports/payment.gateway.port';
import { ConsistOrderUseCase } from '../orders/consist-order.usecase';
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
    private readonly consistOrderUseCase: ConsistOrderUseCase,
  ) {}

  async execute(checkoutRequest: CheckoutModel): Promise<CheckoutModel> {
    let order = await this.orderRepository.getById(checkoutRequest.orderId);

    if (order.status !== 'STARTED') {
      throw new Error('Order must be in STARTED status to create a checkout');
    }

    if (order.orderItems.some((item) => item.isActive) === false) {
      throw new Error('Order must have at least one item to create a checkout');
    }

    if (!order.preparationTime || !order.finalPrice) {
      order = await this.consistOrderUseCase.execute(order.id);
    }

    checkoutRequest.customerId = order.customerId;
    checkoutRequest.status = CheckoutStatus.PENDING;
    order.status = Status.PENDING;
    order.step = Step.PAYMENT_REQUEST;

    await this.orderRepository.update(order.id, order);
    await this.orderQueueUseCase.addOrderToQueue({
      orderId: order.id,
      status: Status.PENDING,
    });

    const createdCheckout =
      await this.checkoutRepository.create(checkoutRequest);

    const paymentSucceed = await this.paymentGateway.execute(order.finalPrice);

    if (paymentSucceed) {
      order.status = Status.APPROVED;
      order.step = Step.COMPLETED;
      createdCheckout.status = CheckoutStatus.APPROVED;
      await this.orderQueueUseCase.addOrderToQueue({
        orderId: order.id,
        status: Status.APPROVED,
      });
    } else {
      order.status = Status.STARTED;
      order.step = Step.CHECKOUT;
      createdCheckout.status = CheckoutStatus.REJECTED;
    }

    await this.orderRepository.update(order.id, order);
    await this.checkoutRepository.update(createdCheckout.id, createdCheckout);

    return createdCheckout;
  }
}
