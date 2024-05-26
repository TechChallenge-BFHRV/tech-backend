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
  GetCartOrderUseCase,
  GetCustomerByCpfUseCase,
  GetItemUseCase,
  OrderStepBackwardUseCase,
  OrderStepForwardUseCase,
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
    GetCartOrderUseCase,
    OrderStepForwardUseCase,
    OrderStepBackwardUseCase,
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
    GetCartOrderUseCase,
    OrderStepForwardUseCase,
    OrderStepBackwardUseCase,
  ],
  controllers: [CustomerController, ItemController, OrderController],
})
export class ApplicationModule {}
