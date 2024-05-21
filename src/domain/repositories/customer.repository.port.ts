import { CustomerModel } from '../models/customers.model';

export interface CustomerRepositoryPort {
  createCustomer(customer: CustomerModel): Promise<CustomerModel>;
  getCustomerByCpf(cpf: string): Promise<CustomerModel>;
  setCustomerCpf(id: number, cpf: string): Promise<CustomerModel>;
}
