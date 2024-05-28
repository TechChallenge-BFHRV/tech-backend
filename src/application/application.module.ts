import { BullModule } from '@nestjs/bull';
import { Module, forwardRef } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { checkoutController as CheckoutController } from './controllers/checkout.controller';
import { CustomerController } from './controllers/customer.controller';
import { ItemController } from './controllers/item.controller';
import { OrderController } from './controllers/order.controller';
import {
  AddItemToOrderUseCase,
  ConsistOrderUseCase,
  CreateCheckoutUseCase,
  CreateCustomerUseCase,
  CreateItemUseCase,
  CreateOrderUseCase,
  GetAllOrdersUseCase,
  GetCartOrderUseCase,
  GetCustomerByCpfUseCase,
  GetItemUseCase,
  GetItemsPerCategoryUseCase,
  GetOrderByIdUseCase,
  GetOrdersByStatusUseCase,
  OrderStepBackwardUseCase,
  OrderStepForwardUseCase,
  SetCustomerCpfUseCase,
  SetItemToOrderUseCase,
  SetOrderCustomerUseCase,
  SetOrderToCancelledUseCase,
  SetOrderToFinishedUseCase,
  SetOrderToPrepareUseCase,
  SetOrderToReadyUseCase,
} from './usecases';
import { OrderQueueUseCase } from './usecases/orders/queue/order-queue.usecase';
import { OrderProcessor } from './usecases/orders/queue/processor/order.processor';

@Module({
  imports: [
    forwardRef(() => InfrastructureModule),
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'order-queue',
    }),
  ],
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
    SetOrderToFinishedUseCase,
    SetOrderToCancelledUseCase,
    OrderQueueUseCase,
    OrderProcessor,
    SetOrderCustomerUseCase,
    GetItemsPerCategoryUseCase,
    ConsistOrderUseCase,
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
    SetOrderToFinishedUseCase,
    SetOrderToCancelledUseCase,
    OrderQueueUseCase,
    OrderProcessor,
    SetOrderCustomerUseCase,
    GetItemsPerCategoryUseCase,
    ConsistOrderUseCase,
  ],
  controllers: [
    CustomerController,
    ItemController,
    OrderController,
    CheckoutController,
  ],
})
export class ApplicationModule {}
