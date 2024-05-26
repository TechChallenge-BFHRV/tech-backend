import { CheckoutModel } from '../models/checkout.model';
import { Repository } from './repository';

export interface CheckoutRepositoryPort extends Repository<CheckoutModel> {}
