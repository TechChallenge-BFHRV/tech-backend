import { Step } from '@prisma/client';
import { OrderModel } from '../models/orders.model';
import { Repository } from './repository';

export interface OrderRepositoryPort extends Repository<OrderModel> {
  orderStepUpdate(id: number, step: Step): Promise<OrderModel>;
}
