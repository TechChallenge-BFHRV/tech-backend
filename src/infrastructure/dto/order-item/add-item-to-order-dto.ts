import { ApiProperty } from '@nestjs/swagger';
import { Item } from '@prisma/client';
import { IsNumber } from 'class-validator';
import { OrderItemModel } from '../../../domain/models/order-items.model';

export class AddItemToOrderDTO implements OrderItemModel {
  id: number;
  Item: Item;

  @ApiProperty()
  @IsNumber()
  orderId: number;

  @ApiProperty()
  @IsNumber()
  itemId: number;
}
