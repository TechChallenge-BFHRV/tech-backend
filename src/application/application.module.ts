import { Module, forwardRef } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CustomerController } from './controllers/customer.controller';
import { OrderController } from './controllers/order.controller';
import {
  CreateCustomerUseCase,
  GetCustomerByCpfUseCase,
  SetCustomerCpfUseCase,
  CreateOrderUseCase,
} from './usecases';

@Module({
  imports: [forwardRef(() => InfrastructureModule)],
  providers: [
    CreateCustomerUseCase,
    SetCustomerCpfUseCase,
    GetCustomerByCpfUseCase,
    CreateOrderUseCase,
  ],
  exports: [
    CreateCustomerUseCase,
    SetCustomerCpfUseCase,
    GetCustomerByCpfUseCase,
    CreateOrderUseCase,
  ],
  controllers: [CustomerController, OrderController],
})
export class ApplicationModule {}
