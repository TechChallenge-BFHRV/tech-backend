import { Status, Step } from '@prisma/client';
import { OrderModel } from '../models/orders.model';
import { Repository } from './repository';

export interface OrderRepositoryPort extends Repository<OrderModel> {
  orderStepUpdate(id: number, step: Step): Promise<OrderModel>;
  getOrdersByStatus(status: Status): Promise<OrderModel[]>;
  setOrderCustomer(orderId: number, customerId: number): Promise<OrderModel>;
}
