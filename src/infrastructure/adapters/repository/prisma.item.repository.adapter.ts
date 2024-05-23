import { Injectable } from '@nestjs/common';
import { ItemModel } from '../../../domain/models/items.model';
import { ItemRepositoryPort } from '../../../domain/ports/item.repository.port';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaItemRepositoryAdapter implements ItemRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

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
