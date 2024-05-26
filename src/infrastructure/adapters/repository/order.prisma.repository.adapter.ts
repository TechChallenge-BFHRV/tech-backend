import { Injectable } from '@nestjs/common';
import { Step } from '@prisma/client';
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

  update(id: number, data: OrderModel): Promise<OrderModel> {
    const updatedOrder = this.prisma.order.update({
      where: { id: data.id },
      data: {
        name: data.name,
        totalPrice: data.totalPrice,
        status: data.status,
        step: data.step,
        preparationTime: data.preparationTime,
        finalPrice: data.finalPrice,
        customerId: data.customerId,
      },
    });
    return updatedOrder;
  }

  async getById(id: number): Promise<OrderModel> {
    const orders = await this.prisma.order.findUnique({
      where: { id: id },
      include: {
        orderItems: {
          include: {
            Item: true,
          },
        },
      },
    });
    return orders;
  }
  getAll(): Promise<OrderModel[]> {
    const orders = this.prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            Item: true,
          },
        },
      },
    });
    return orders;
  }
  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async orderStepUpdate(id: number, step: Step): Promise<OrderModel> {
    const order = await this.prisma.order.update({
      where: { id: id },
      data: {
        step: step,
      },
    });
    return order;
  }
}
