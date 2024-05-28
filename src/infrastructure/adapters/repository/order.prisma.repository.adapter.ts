import { Injectable } from '@nestjs/common';
import { Status, Step } from '@prisma/client';
import { OrderModel } from '../../../domain/models/orders.model';
import { OrderRepositoryPort } from '../../../domain/ports/order.repository.port';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaOrderRepositoryAdapter implements OrderRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(order: OrderModel): Promise<OrderModel> {
    const createdOrder = await this.prisma.order.create({
      data: {
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
    const order = await this.prisma.order.findUnique({
      where: { id: id },
      include: {
        orderItems: {
          include: {
            Item: true,
          },
        },
      },
    });
    if (!order) throw new Error('Order not found!');
    return order;
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

  async getOrdersByStatus(status: Status): Promise<OrderModel[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        status: status,
      },
    });
    return orders;
  }

  async setOrderCustomer(
    orderId: number,
    customerId: number,
  ): Promise<OrderModel> {
    const updatedOrderCustomer = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        customerId,
      },
    });

    return updatedOrderCustomer;
  }
}
