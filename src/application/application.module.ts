import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaItemRepositoryAdapter } from '../infraestructure/repositories/prisma.item.repository.adapter';
import { CreateItemUseCase } from './usecases/create-item.usecase';

@Module({
  imports: [],
  providers: [
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
    CreateItemUseCase,
    {
      provide: 'ItemRepository',
      useClass: PrismaItemRepositoryAdapter,
    },
  ],
  exports: [CreateItemUseCase],
})
export class ApplicationModule {}
