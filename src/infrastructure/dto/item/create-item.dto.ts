import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ItemCategory } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ItemModel } from '../../../domain/models/items.model';

export class CreateItemDTO implements ItemModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsEnum(ItemCategory)
  category: ItemCategory;

  @ApiProperty()
  @IsNumber()
  preparationTime: number;

  @ApiPropertyOptional()
  imageUrl?: string;
}
