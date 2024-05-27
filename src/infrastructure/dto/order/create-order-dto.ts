import { OrderItems, Status, Step } from '@prisma/client';
import { OrderModel } from '../../../domain/models/orders.model';

export class CreateOrderDTO implements OrderModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  totalPrice: number;
  orderitems?: OrderItems;
  status: Status;
  step: Step;
}
