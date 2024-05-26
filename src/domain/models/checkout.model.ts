import { CheckoutStatus } from '@prisma/client';
import { OrderModel } from './orders.model';

export class CheckoutModel {
  id: number;
  orderId?: number;
  order?: OrderModel;
  customerId?: number;
  status: CheckoutStatus;
  createdAt: Date;
  updatedAt: Date;
}
