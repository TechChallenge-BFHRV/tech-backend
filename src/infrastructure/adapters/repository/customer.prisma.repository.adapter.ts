import { Injectable } from '@nestjs/common';
import { CustomerModel } from '../../../domain/models/customers.model';
import { CustomerRepositoryPort } from '../../../domain/ports/customer.repository.port';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCustomerRepositoryAdapter implements CustomerRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(customer: CustomerModel): Promise<CustomerModel> {
    const createdCustomer = await this.prisma.customer.create({
      data: {
        name: customer.name,
        email: customer.email,
        cpf: customer.cpf,
      },
    });
    return createdCustomer;
  }

  async getCustomerByCpf(cpf: string): Promise<CustomerModel> {
    const customer = await this.prisma.customer.findUnique({
      where: { cpf: cpf },
    });
    if (!customer) throw new Error('Customer not found!');
    return customer;
  }

  async setCustomerCpf(id: number, cpf: string): Promise<CustomerModel> {
    return await this.prisma.customer.update({
      where: { id: id },
      data: {
        cpf: cpf,
      },
    });
  }

  update(id: number, data: CustomerModel): Promise<CustomerModel> {
    throw new Error('Method not implemented.');
  }
  getById(id: number): Promise<CustomerModel> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<CustomerModel[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
