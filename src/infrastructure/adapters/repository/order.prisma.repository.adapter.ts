import { Injectable } from '@nestjs/common';
import { OrderModel } from '../../../domain/models/orders.model';
import { OrderRepositoryPort } from '../../../domain/ports/order.repository.port';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaOrderRepositoryAdapter implements OrderRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(order: OrderModel): Promise<OrderModel> {
    const createdOrder = await this.prisma.order.create({
      data: {
        name: order.name,
        totalPrice: order.totalPrice,
        status: order.status,
        step: order.step,
      },
    });
    return createdOrder;
  }

  update(id: string, data: OrderModel): Promise<OrderModel> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<OrderModel> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<OrderModel[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
