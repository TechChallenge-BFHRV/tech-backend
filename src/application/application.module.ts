import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaCustomerRepositoryAdapter } from '../infrastructure/repositories/prisma.customer.repository.adapter';
import { PrismaItemRepositoryAdapter } from '../infrastructure/repositories/prisma.item.repository.adapter';
import { CreateCustomerUseCase } from './usecases/create-customer.usecase';
import { CreateItemUseCase } from './usecases/create-item.usecase';
import { GetCustomerByCpfUseCase } from './usecases/get-customer-by-cpf.usecase';
import { SetCustomerCpfUseCase } from './usecases/set-customer-cpf.usecase';

@Module({
  imports: [],
  providers: [
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
    CreateItemUseCase,
    CreateCustomerUseCase,
    SetCustomerCpfUseCase,
    GetCustomerByCpfUseCase,
    {
      provide: 'ItemRepository',
      useClass: PrismaItemRepositoryAdapter,
    },
    {
      provide: 'CustomerRepository',
      useClass: PrismaCustomerRepositoryAdapter,
    },
  ],
  exports: [
    CreateItemUseCase,
    CreateCustomerUseCase,
    SetCustomerCpfUseCase,
    GetCustomerByCpfUseCase,
  ],
})
export class ApplicationModule {}
