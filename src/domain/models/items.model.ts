import { ItemCategory } from '@prisma/client';
export interface ItemModel {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  price: number;
  createdAt: Date;
  category: ItemCategory;
}
