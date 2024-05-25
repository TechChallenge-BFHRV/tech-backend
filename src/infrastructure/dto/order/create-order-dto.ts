import { ApiProperty } from '@nestjs/swagger';
import { OrderItems, Status, Step } from '@prisma/client';
import { IsString } from 'class-validator';
import { OrderModel } from '../../../domain/models/orders.model';

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
