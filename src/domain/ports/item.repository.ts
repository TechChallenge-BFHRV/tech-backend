import Item from '../models/items.model';

export interface ItemRepository {
  /**
   *
   */
  getAll(): Promise<Item[]>;

  /**
   * Returns item filtered by id
   * @param {number} itemId
   * @returns an `Item` object containing the data.
   */
  getProduct(id: number): Promise<Item>;

  /**
   *
   */
  createItem(item: Item): Promise<Item>;

  /**
   *
   */
  deleteItem(itemId: number): Promise<Item>;

  /**
   *
   */
  updateItem(itemId: string, item: Item): Promise<Item>;
}
