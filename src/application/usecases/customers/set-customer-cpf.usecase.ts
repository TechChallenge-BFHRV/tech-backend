import { Inject, Injectable } from '@nestjs/common';
import { CustomerModel } from '../../../domain/models/customers.model';
import { CustomerRepositoryPort } from '../../../domain/ports/customer.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class SetCustomerCpfUseCase implements IUseCase<CustomerModel> {
  constructor(
    @Inject('CustomerRepositoryPort')
    private readonly customerRepository: CustomerRepositoryPort,
  ) {}

  async execute(id: number, cpf: string): Promise<CustomerModel> {
    const updatedCustomer = await this.customerRepository.setCustomerCpf(
      id,
      cpf,
    );
    return updatedCustomer;
  }
}
