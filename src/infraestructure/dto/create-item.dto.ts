import { ItemCategory } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ItemModel } from '../../domain/models/items.model';

export class CreateItemDTO implements ItemModel {
  imageUrl?: string;
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  createdAt: Date;

  @IsEnum(ItemCategory)
  category: ItemCategory;
}
