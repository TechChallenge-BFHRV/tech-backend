import { Inject, Injectable } from '@nestjs/common';
import { ItemModel } from '../../../domain/models/items.model';
import { ItemRepositoryPort } from '../../../domain/ports/item.repository.port';
import { IUseCase } from '../usecase';

@Injectable()
export class GetItemUseCase implements IUseCase<ItemModel> {
  constructor(
    @Inject('ItemRepositoryPort')
    private readonly itemRepository: ItemRepositoryPort,
  ) {}
  async execute(): Promise<ItemModel[]> {
    const items = await this.itemRepository.getAll();
    return items;
  }
}
