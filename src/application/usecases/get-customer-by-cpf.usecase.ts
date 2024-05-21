import { Inject, Injectable } from '@nestjs/common';
import { CustomerModel } from '../../domain/models/customers.model';
import { CustomerRepositoryPort } from '../../domain/repositories/customer.repository.port';

@Injectable()
export class GetCustomerByCpfUseCase {
  constructor(
    @Inject('CustomerRepository')
    private customerRepository: CustomerRepositoryPort,
  ) {}

  async execute(cpf: string): Promise<CustomerModel> {
    const customer = await this.customerRepository.getCustomerByCpf(cpf);
    return customer;
  }
}
