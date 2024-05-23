import { Module } from '@nestjs/common';
import { PrismaService } from './adapters/prisma.service';
import { PrismaCustomerRepositoryAdapter } from './adapters/repository/customer.prisma.repository.adapter';

@Module({
  providers: [
    PrismaService,
    {
      provide: 'CustomerRepositoryPort',
      useClass: PrismaCustomerRepositoryAdapter,
    },
  ],
  exports: [
    PrismaService,
    {
      provide: 'CustomerRepositoryPort',
      useClass: PrismaCustomerRepositoryAdapter,
    },
  ],
})
export class InfrastructureModule {}
