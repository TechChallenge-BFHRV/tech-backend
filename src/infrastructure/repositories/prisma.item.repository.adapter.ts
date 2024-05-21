import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ItemModel } from '../../domain/models/items.model';
import { ItemRepositoryPort } from '../../domain/repositories/item.repository.port';

@Injectable()
export class PrismaItemRepositoryAdapter implements ItemRepositoryPort {
  constructor(private prisma: PrismaClient) {}

  async createItem(item: ItemModel): Promise<ItemModel> {
    const createdItem = await this.prisma.item.create({
      data: {
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
      },
    });
    return createdItem;
  }

  async findItemById(itemId: number): Promise<ItemModel> {
    return await this.prisma.item.findUnique({
      where: { id: itemId },
    });
  }
}
