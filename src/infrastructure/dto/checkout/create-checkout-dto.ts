import { ApiPropertyOptional } from '@nestjs/swagger';
import { Checkout, CheckoutStatus } from '@prisma/client';
import { IsNumber } from 'class-validator';

export class CreateCheckoutDTO implements Checkout {
  customerId: number;
  id: number;
  status: CheckoutStatus;
  createdAt: Date;
  updatedAt: Date;

  @ApiPropertyOptional()
  @IsNumber()
  orderId: number;
}
