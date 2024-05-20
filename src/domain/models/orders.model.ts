import { OrderStatus } from '../../enums/order-status.enum';
import { OrderStep } from '../../enums/order-step.enum';
import OrderIdInvalidException from '../exceptions/order-id-invalid.exception';
import type { ItemModel } from '../models/items.model';

export default class OrderModel {
  private id: number | null;
  private readonly name: string;
  private readonly totalPrice: number;
  private items: ItemModel[];
  private userId?: number;
  private status: OrderStatus;
  private step: OrderStep;
  private createdAt: Date;

  constructor(id: number, name: string) {
    this.id = id || null;
    this.name = name;
    this.totalPrice = this.totalPrice;
    this.items = [];
    this.status = OrderStatus.STARTED;
    this.validateOrder();
  }

  public validateOrder(): void {
    if (!this.id || typeof this.id !== 'number') {
      throw new OrderIdInvalidException('Order ID is invalid');
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

  public setStatus(status: OrderStatus): this {
    this.status = status;
    return this;
  }

  public setStep(step: OrderStep): this {
    this.step = step;
    return this;
  }

  public setUserId(id: number): this {
    this.userId = id;
    return this;
  }
}
