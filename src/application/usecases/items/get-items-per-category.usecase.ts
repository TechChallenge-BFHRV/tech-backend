import { Inject, Injectable } from '@nestjs/common';
import { ItemCategory } from '@prisma/client';
import { ItemModel } from '../../../domain/models/items.model';
import { ItemRepositoryPort } from '../../../domain/ports/item.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class GetItemsPerCategoryUseCase implements IUseCase<ItemModel> {
  constructor(
    @Inject('ItemRepositoryPort')
    private readonly itemRepository: ItemRepositoryPort,
  ) {}
  async execute(category: ItemCategory): Promise<ItemModel[]> {
    const items = await this.itemRepository.getItemsPerCategory(category);
    return items;
  }
}
