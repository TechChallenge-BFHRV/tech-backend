import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaCustomerRepositoryAdapter } from '../infraestructure/repositories/prisma.customer.repository.adapter';
import { PrismaItemRepositoryAdapter } from '../infraestructure/repositories/prisma.item.repository.adapter';
import { CreateCustomerUseCase } from './usecases/create-customer.usecase';
import { CreateItemUseCase } from './usecases/create-item.usecase';

@Module({
  imports: [],
  providers: [
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
    CreateItemUseCase,
    CreateCustomerUseCase,
    {
      provide: 'ItemRepository',
      useClass: PrismaItemRepositoryAdapter,
    },
    {
      provide: 'CustomerRepository',
      useClass: PrismaCustomerRepositoryAdapter,
    },
  ],
  exports: [CreateItemUseCase, CreateCustomerUseCase],
})
export class ApplicationModule {}
