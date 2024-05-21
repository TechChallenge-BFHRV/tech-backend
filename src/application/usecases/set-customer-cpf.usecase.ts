import { Inject, Injectable } from '@nestjs/common';
import { CustomerModel } from '../../domain/models/customers.model';
import { CustomerRepositoryPort } from '../../domain/repositories/customer.repository.port';

@Injectable()
export class SetCustomerCpfUseCase {
  constructor(
    @Inject('CustomerRepository')
    private customerRepository: CustomerRepositoryPort,
  ) {}

  async execute(id: number, cpf: string): Promise<CustomerModel> {
    const updatedCustomer = await this.customerRepository.setCustomerCpf(
      id,
      cpf,
    );
    return updatedCustomer;
  }
}
