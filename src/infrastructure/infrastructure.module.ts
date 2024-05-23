/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { PrismaService } from './adapters/prisma.service';
import { PrismaCustomerRepositoryAdapter } from './adapters/repository/customer.prisma.repository.adapter';
import { CustomerController } from './controllers/customer.controller';

@Module({
  providers: [
    PrismaService,
    {
      provide: 'CustomerRepositoryPort',
      useClass: PrismaCustomerRepositoryAdapter,
    },
  ],
  exports: [
    {
      provide: 'CustomerRepositoryPort',
      useClass: PrismaCustomerRepositoryAdapter,
    },
  ],
  controllers: [CustomerController],
})
export class InfrastructureModule {}
