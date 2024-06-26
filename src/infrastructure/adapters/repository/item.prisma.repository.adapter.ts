import { Injectable } from '@nestjs/common';
import { ItemCategory } from '@prisma/client';
import { ItemModel } from '../../../domain/models/items.model';
import { ItemRepositoryPort } from '../../../domain/ports/item.repository.port';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaItemRepositoryAdapter implements ItemRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(item: ItemModel): Promise<ItemModel> {
    const createdItem = await this.prisma.item.create({
      data: {
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
        preparationTime: item.preparationTime,
        category: item.category,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      },
    });
    return item;
  }

  update(id: number, data: ItemModel): Promise<ItemModel> {
    throw new Error('Method not implemented.');
  }
  getById(id: number): Promise<ItemModel> {
    throw new Error('Method not implemented.');
  }
  getAll(): Promise<ItemModel[]> {
    const items = this.prisma.item.findMany();
    return items;
  }
  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getItemsPerCategory(category: ItemCategory): Promise<ItemModel[]> {
    const items = await this.prisma.item.findMany({
      where: {
        category: category,
      },
    });
    return items;
  }
}
