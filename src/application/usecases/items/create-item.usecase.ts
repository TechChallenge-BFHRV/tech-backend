import { Inject, Injectable } from '@nestjs/common';
import { ItemModel } from '../../../domain/models/items.model';
import { ItemRepositoryPort } from '../../../domain/ports/item.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class CreateItemUseCase implements IUseCase<ItemModel> {
  constructor(
    @Inject('ItemRepositoryPort')
    private readonly itemRepository: ItemRepositoryPort,
  ) {}
  async execute(item: ItemModel): Promise<ItemModel> {
    item.preparationTime = item.preparationTime || 0;
    const createdItem = await this.itemRepository.create(item);
    return createdItem;
  }
}
