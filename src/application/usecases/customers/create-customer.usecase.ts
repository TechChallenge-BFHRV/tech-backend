import { Inject, Injectable } from '@nestjs/common';
import { CustomerModel } from '../../../domain/models/customers.model';
import { CustomerRepositoryPort } from '../../../domain/ports/customer.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class CreateCustomerUseCase implements IUseCase<CustomerModel> {
  constructor(
    @Inject('CustomerRepositoryPort')
    private readonly customerRepository: CustomerRepositoryPort,
  ) {}
  async execute(customer: CustomerModel): Promise<CustomerModel> {
    const createdCustomer = await this.customerRepository.create(customer);
    return createdCustomer;
  }
}
