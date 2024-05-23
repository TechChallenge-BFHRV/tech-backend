import { Inject, Injectable } from '@nestjs/common';
import { CustomerModel } from '../../../domain/models/customers.model';
import { CustomerRepositoryPort } from '../../../domain/ports/customer.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class GetCustomerByCpfUseCase implements IUseCase<CustomerModel> {
  constructor(
    @Inject('CustomerRepositoryPort')
    private readonly customerRepository: CustomerRepositoryPort,
  ) {}
  async execute(cpf: string): Promise<CustomerModel> {
    const customer = await this.customerRepository.getCustomerByCpf(cpf);
    return customer;
  }
}
