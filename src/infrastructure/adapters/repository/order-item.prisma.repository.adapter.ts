import { Injectable } from '@nestjs/common';
import { OrderItemModel } from '../../../domain/models/order-items.model';
import { OrderItemRepositoryPort } from '../../../domain/ports/order-item.repository.port';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaOrderItemRepositoryAdapter
  implements OrderItemRepositoryPort
{
  constructor(private readonly prisma: PrismaService) {}
  async create(orderItem: OrderItemModel): Promise<OrderItemModel> {
    const createdOrderItem = await this.prisma.orderItems.create({
      data: {
        orderId: orderItem.orderId,
        itemId: orderItem.itemId,
      },
    });
    return createdOrderItem;
  }

  update(id: string, data: OrderItemModel): Promise<OrderItemModel> {
    throw new Error('Method not implemented.');
  }
  getById(id: number): Promise<OrderItemModel> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<OrderItemModel[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
