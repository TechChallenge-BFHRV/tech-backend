import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CustomerModel } from '../../../domain/models/customers.model';
import { CustomerRepositoryPort } from '../../../domain/ports/customer.repository.port';

@Injectable()
export class PrismaCustomerRepositoryAdapter implements CustomerRepositoryPort {
  constructor(private prisma: PrismaClient) {}

  async create(customer: CustomerModel): Promise<CustomerModel> {
    const createdCustomer = await this.prisma.customer.create({
      data: {
        name: customer.name,
      },
    });
    return createdCustomer;
  }

  async getCustomerByCpf(cpf: string): Promise<CustomerModel> {
    return await this.prisma.customer.findUnique({
      where: { cpf: cpf },
    });
  }

  async setCustomerCpf(id: number, cpf: string): Promise<CustomerModel> {
    return await this.prisma.customer.update({
      where: { id: id },
      data: {
        cpf: cpf,
      },
    });
  }

  update(id: string, data: CustomerModel): Promise<CustomerModel> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<CustomerModel> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<CustomerModel[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
