import { Injectable } from '@nestjs/common';
import { CheckoutModel } from '../../../domain/models/checkout.model';
import { CheckoutRepositoryPort } from '../../../domain/ports/checkout.repository.port';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCheckoutRepositoryAdapter implements CheckoutRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(checkout: CheckoutModel): Promise<CheckoutModel> {
    const createdCheckout = await this.prisma.checkout.create({
      data: {
        id: checkout.id,
        status: checkout.status,
        orderId: checkout.orderId,
        customerId: checkout.customerId,
      },
    });
    return createdCheckout;
  }

  update(id: number, data: CheckoutModel): Promise<CheckoutModel> {
    const updatedCheckout = this.prisma.checkout.update({
      where: { id: data.id },
      data: {
        status: data.status,
        orderId: data.orderId,
        customerId: data.customerId,
      },
    });
    return updatedCheckout;
  }
  getById(id: number): Promise<CheckoutModel> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<CheckoutModel[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
