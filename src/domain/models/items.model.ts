import { ItemCategory } from '@prisma/client';
export class ItemModel {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  category: ItemCategory;
  preparationTime: number;

  constructor(
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    price: number,
    createdAt: Date,
    updatedAt: Date,
    category: ItemCategory,
    preparationTime: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.category = category;
    this.preparationTime = 0;
  }
}
