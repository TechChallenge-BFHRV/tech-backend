import { OrderModel } from '../models/orders.model';
import { Repository } from './repository';

export interface OrderRepositoryPort extends Repository<OrderModel> {}
