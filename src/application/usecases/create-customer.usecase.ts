import { Inject, Injectable } from '@nestjs/common';
import { CustomerModel } from '../../domain/models/customers.model';
import { CustomerRepositoryPort } from '../../domain/repositories/customer.repository.port';

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    @Inject('CustomerRepository')
    private customerRepository: CustomerRepositoryPort,
  ) {}

  async execute(customer: CustomerModel): Promise<CustomerModel> {
    const createdCustomer =
      await this.customerRepository.createCustomer(customer);
    return createdCustomer;
  }
}
