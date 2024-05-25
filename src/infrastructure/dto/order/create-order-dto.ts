import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { OrderModel } from '../../../domain/models/orders.model';
import { ItemModel } from 'src/domain/models/items.model';
import { OrderItems, Status, Step } from '@prisma/client';

export class CreateOrderDTO implements OrderModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  totalPrice: number;
  orderitems?: OrderItems;
  status: Status;
  step: Step;

  @ApiProperty()
  @IsString()
  name: string = 'Cliente não identificado';
}
