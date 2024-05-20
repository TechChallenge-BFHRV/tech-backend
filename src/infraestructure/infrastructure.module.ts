/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { PrismaService } from './adapters/prisma.service';
import { CustomerController } from './controllers/customer/customer.controller';
import { OrderController } from './controllers/order/order.controller';

@Module({
  providers: [PrismaService],
  exports: [],
  controllers: [OrderController, CustomerController],
})
export class InfraestructureModule {}
