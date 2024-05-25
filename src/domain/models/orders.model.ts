import { Status, Step } from '@prisma/client';
import { OrderItemModel } from './order-items.model';

export class OrderModel {
  id: number | null;
  name: string;
  totalPrice: number;
  orderItems?: OrderItemModel[];
  customerId?: number;
  status: Status;
  step: Step;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number, name: string) {
    this.id = id || null;
    this.name = name;
    this.totalPrice = this.totalPrice;
    this.status = null;
    this.step = null;
  }
}
