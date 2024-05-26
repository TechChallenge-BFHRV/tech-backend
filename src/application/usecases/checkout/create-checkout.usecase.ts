import { Inject, Injectable } from '@nestjs/common';
import { CheckoutModel } from '../../../domain/models/checkout.model';
import { CheckoutRepositoryPort } from '../../../domain/ports/checkout.repository.port';
import { OrderRepositoryPort } from '../../../domain/ports/order.repository.port';
import { PaymentGatewayPort } from '../../../domain/ports/payment.gateway.port';
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
  ) {}
  async execute(checkoutRequest: CheckoutModel): Promise<CheckoutModel> {
    const order = await this.orderRepository.getById(checkoutRequest.orderId);

    if (order.status !== 'STARTED') {
      throw new Error('Order must be in STARTED status to create a checkout');
    }

    checkoutRequest.customerId = order.customerId;
    checkoutRequest.status = 'PENDING';

    const createdCheckout =
      await this.checkoutRepository.create(checkoutRequest);

    const paymentSucceed = await this.paymentGateway.execute(order.finalPrice);

    if (paymentSucceed) {
      order.status = 'PENDING';
      createdCheckout.status = 'APPROVED';
    } else {
      order.status = 'STARTED';
      createdCheckout.status = 'REJECTED';
    }

    await this.orderRepository.update(order.id, order);
    await this.checkoutRepository.update(createdCheckout.id, createdCheckout);

    return createdCheckout;
  }
}