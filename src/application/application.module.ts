import { Module, forwardRef } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { checkoutController as CheckoutController } from './controllers/checkout.controller';
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
  GetItemsPerCategoryUseCase,
  OrderStepBackwardUseCase,
  OrderStepForwardUseCase,
  SetCustomerCpfUseCase,
} from './usecases';
import { CreateCheckoutUseCase } from './usecases/checkout/create-checkout.usecase';

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
    GetItemsPerCategoryUseCase,
    CreateCheckoutUseCase,
    set-order-step
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
    get-items-by-category
    GetItemsPerCategoryUseCase,
    CreateCheckoutUseCase,
  ],
  controllers: [
    CustomerController,
    ItemController,
    OrderController,
    CheckoutController,
    set-order-step
  ],
})
export class ApplicationModule {}
