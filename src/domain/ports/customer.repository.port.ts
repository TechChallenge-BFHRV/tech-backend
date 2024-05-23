import { CustomerModel } from '../models/customers.model';
import { Repository } from './repository';

export interface CustomerRepositoryPort extends Repository<CustomerModel> {
  getCustomerByCpf(cpf: string): Promise<CustomerModel>;
  setCustomerCpf(id: number, cpf: string): Promise<CustomerModel>;
}
