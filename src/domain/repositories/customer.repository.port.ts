import { CustomerModel } from '../models/customers.model';

export interface CustomerRepositoryPort {
  createCustomer(customer: CustomerModel): Promise<CustomerModel>;
  findCustomerByCpf(cpf: string): Promise<CustomerModel>;
}