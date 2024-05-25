import { Item } from '@prisma/client';

export class OrderItemModel {
  id: number;
  orderId: number;
  itemId: number;
  Item?: Item;
}
