import { OrderItemModel } from '../models/order-items.model';
import { Repository } from './repository';

export interface OrderItemRepositoryPort extends Repository<OrderItemModel> {
  setOrderItemId(orderItemId: number): Promise<OrderItemModel>;
}
