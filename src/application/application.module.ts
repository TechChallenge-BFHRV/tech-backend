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
  GetOrderByIdUseCase,
  GetOrdersByStatusUseCase,
  OrderStepBackwardUseCase,
  OrderStepForwardUseCase,
  SetCustomerCpfUseCase,
  SetItemToOrderUseCase,
  SetOrderToPrepareUseCase,
  SetOrderToReadyUseCase,
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
    SetItemToOrderUseCase,
    GetCartOrderUseCase,
    OrderStepForwardUseCase,
    OrderStepBackwardUseCase,
    CreateCheckoutUseCase,
    GetOrdersByStatusUseCase,
    GetOrderByIdUseCase,
    SetOrderToPrepareUseCase,
    SetOrderToReadyUseCase,
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
    SetItemToOrderUseCase,
    GetCartOrderUseCase,
    OrderStepForwardUseCase,
    OrderStepBackwardUseCase,
    CreateCheckoutUseCase,
    GetOrdersByStatusUseCase,
    GetOrderByIdUseCase,
    SetOrderToPrepareUseCase,
    SetOrderToReadyUseCase,
  ],
  controllers: [
    CustomerController,
    ItemController,
    OrderController,
    CheckoutController,
  ],
})
export class ApplicationModule {}
