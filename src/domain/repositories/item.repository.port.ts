import { ItemModel } from '../models/items.model';

export interface ItemRepositoryPort {
  createItem(item: ItemModel): Promise<ItemModel>;
  findItemById(itemId: number): Promise<ItemModel>;
}
