/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { PrismaService } from './adapters/prisma.service';
import { CustomerController } from './controllers/customer/customer.controller';
import { ItemController } from './controllers/items.controller';
import { OrderController } from './controllers/order/order.controller';

@Module({
  imports: [ApplicationModule],
  providers: [PrismaService],
  exports: [],
  controllers: [OrderController, CustomerController, ItemController],
})
export class InfrastructureModule {}
