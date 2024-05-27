import { Status, Step } from '@prisma/client';
import { OrderItemModel } from './order-items.model';

export class OrderModel {
  id: number | null;
  totalPrice: number;
  orderItems?: OrderItemModel[];
  customerId?: number;
  status: Status;
  step: Step;
  createdAt: Date;
  updatedAt: Date;
  finalPrice?: number;
  preparationTime?: number;

  constructor(id: number) {
    this.id = id || null;
    this.totalPrice = this.totalPrice;
    this.status = null;
    this.step = null;
  }
}
