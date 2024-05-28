import { ItemCategory } from '@prisma/client';
import { ItemModel } from '../models/items.model';
import { Repository } from './repository';

export interface ItemRepositoryPort extends Repository<ItemModel> {
  getItemsPerCategory(category: ItemCategory): Promise<ItemModel[]>;
}
