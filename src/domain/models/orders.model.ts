import { OrderItems, Status, Step } from '@prisma/client';
import OrderIdInvalidException from '../exceptions/order-id-invalid.exception';
import type { ItemModel } from '../models/items.model';

export class OrderModel {
  id: number | null;
  name: string;
  totalPrice: number;
  orderItems?: OrderItems[];
  customerId?: number;
  status: Status;
  step: Step;
  createdAt: Date;

  constructor(id: number, name: string) {
    this.id = id || null;
    this.name = name;
    this.totalPrice = this.totalPrice;
    this.status = null;
    this.step = null;
  }
}
