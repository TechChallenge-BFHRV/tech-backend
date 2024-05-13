import CustomerIdInvalidException from '../exceptions/customer-id-invalid.exception';
import type OrderModel from './orders.model';

export default class CustomerModel {
  private id: number | null;
  private readonly name: string;
  private lastName?: string;
  private cpf?: string;
  private orders?: OrderModel[];
  private createdAt: Date;
  private updatedAt: Date;

  constructor(id: number, name: string) {
    this.id = id || null;
    this.name = name;
    this.validateCustomer();
  }

  public validateCustomer(): void {
    if (!this.id || typeof this.id !== 'number') {
      throw new CustomerIdInvalidException('Customer ID is invalid');
    }
  }

  public getName(): string {
    return this.name;
  }

  public getId(): number {
    return this.id;
  }

  public setCreatedAt(createdAt: Date): this {
    this.createdAt = createdAt;
    return this;
  }

  public setUpdatedAt(updatedAt: Date): this {
    this.updatedAt = updatedAt;
    return this;
  }

  public setCustomerLastName(lastName: string): this {
    this.lastName = lastName;
    return this;
  }

  public setCustomerCPF(cpf: string): this {
    this.cpf = cpf;
    return this;
  }

  public setCustomerOrders(orders: OrderModel[]): this {
    this.orders = [...orders];
    return this;
  }
}
