import { Module } from '@nestjs/common';
import { PrismaService } from './adapters/prisma.service';
import { PrismaCustomerRepositoryAdapter } from './adapters/repository/customer.prisma.repository.adapter';
import { PrismaItemRepositoryAdapter } from './adapters/repository/item.prisma.repository.adapter';
import { PrismaOrderRepositoryAdapter } from './adapters/repository/order.prisma.repository.adapter';

@Module({
  providers: [
    PrismaService,
    {
      provide: 'CustomerRepositoryPort',
      useClass: PrismaCustomerRepositoryAdapter,
    },
    {
      provide: 'ItemRepositoryPort',
      useClass: PrismaItemRepositoryAdapter,
    },
    {
      provide: 'OrderRepositoryPort',
      useClass: PrismaOrderRepositoryAdapter,
    },
  ],
  exports: [
    PrismaService,
    {
      provide: 'CustomerRepositoryPort',
      useClass: PrismaCustomerRepositoryAdapter,
    },
    {
      provide: 'ItemRepositoryPort',
      useClass: PrismaItemRepositoryAdapter,
    },
    {
      provide: 'OrderRepositoryPort',
      useClass: PrismaOrderRepositoryAdapter,
    },
  ],
})
export class InfrastructureModule {}
