import { PaymentGatewayPort } from '../../../domain/ports/payment.gateway.port';

export class FakePaymentGatewayAdapter implements PaymentGatewayPort {
  async execute(amount: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() < 0.5);
      }, 1000);
    });
  }
}
