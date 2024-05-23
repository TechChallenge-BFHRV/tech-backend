import { Module, forwardRef } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CustomerController } from './controllers/customer.controller';
import {
  CreateCustomerUseCase,
  GetCustomerByCpfUseCase,
  SetCustomerCpfUseCase,
} from './usecases';

@Module({
  imports: [forwardRef(() => InfrastructureModule)],
  providers: [
    CreateCustomerUseCase,
    SetCustomerCpfUseCase,
    GetCustomerByCpfUseCase,
  ],
  exports: [
    CreateCustomerUseCase,
    SetCustomerCpfUseCase,
    GetCustomerByCpfUseCase,
  ],
  controllers: [CustomerController],
})
export class ApplicationModule {}
