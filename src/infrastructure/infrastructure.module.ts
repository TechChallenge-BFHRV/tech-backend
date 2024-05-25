import { Module } from '@nestjs/common';
import { PrismaService } from './adapters/prisma.service';
import { PrismaCustomerRepositoryAdapter } from './adapters/repository/customer.prisma.repository.adapter';
import { PrismaItemRepositoryAdapter } from './adapters/repository/item.prisma.repository.adapter';

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
  ],
})
export class InfrastructureModule {}
