import { Inject, Injectable } from '@nestjs/common';
import { ItemModel } from '../../domain/models/items.model';
import { ItemRepositoryPort } from '../../domain/repositories/item.repository.port';

@Injectable()
export class CreateItemUseCase {
  constructor(
    @Inject('ItemRepository') private itemRepository: ItemRepositoryPort,
  ) {}

  async execute(item: ItemModel): Promise<ItemModel> {
    const createdItem = await this.itemRepository.createItem(item);
    return createdItem;
  }
}
