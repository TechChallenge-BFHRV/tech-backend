export interface PaymentGatewayPort {
  execute(amount: number): Promise<boolean>;
}
