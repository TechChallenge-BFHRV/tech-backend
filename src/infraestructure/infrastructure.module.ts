/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { PrismaService } from './adapters/prisma.service';
import { OrderController } from './controllers/order/order.controller';

@Module({
  providers: [PrismaService],
  exports: [],
  controllers: [OrderController],
})
export class InfraestructureModule {}
