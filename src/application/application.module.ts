import { Module, forwardRef } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CustomerController } from './controllers/customer.controller';
import { ItemController } from './controllers/item.controller';
import { OrderController } from './controllers/order.controller';
import {
  AddItemToOrderUseCase,
  CreateCustomerUseCase,
  CreateItemUseCase,
  CreateOrderUseCase,
  GetAllOrdersUseCase,
  GetCustomerByCpfUseCase,
  GetItemUseCase,
  SetCustomerCpfUseCase,
} from './usecases';

@Module({
  imports: [forwardRef(() => InfrastructureModule)],
  providers: [
    CreateCustomerUseCase,
    SetCustomerCpfUseCase,
    GetCustomerByCpfUseCase,
    GetItemUseCase,
    CreateItemUseCase,
    CreateOrderUseCase,
    AddItemToOrderUseCase,
    GetAllOrdersUseCase,
  ],
  exports: [
    CreateCustomerUseCase,
    SetCustomerCpfUseCase,
    GetCustomerByCpfUseCase,
    GetItemUseCase,
    CreateItemUseCase,
    CreateOrderUseCase,
    AddItemToOrderUseCase,
    GetAllOrdersUseCase,
  ],
  controllers: [CustomerController, ItemController, OrderController],
})
export class ApplicationModule {}
