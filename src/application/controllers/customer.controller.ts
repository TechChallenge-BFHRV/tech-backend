import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCustomerDTO } from '../../infrastructure/dto/customer/create-customer.dto';
import { CreateCustomerUseCase } from '../usecases/customers/create-customer.usecase';
import { GetCustomerByCpfUseCase } from '../usecases/customers/get-customer-by-cpf.usecase';
import { SetCustomerCpfUseCase } from '../usecases/customers/set-customer-cpf.usecase';

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly setCustomerCpfUseCase: SetCustomerCpfUseCase,
    private readonly getCustomerByCpfUseCase: GetCustomerByCpfUseCase,
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Customer created successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  async createCustomer(@Body() customer: CreateCustomerDTO) {
    const customerCreated = await this.createCustomerUseCase.execute(customer);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Customer created successfully',
      data: customerCreated,
    };
  }

  @Put(':customerId')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Customer updated successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  async setCustomerCpf(
    @Param('customerId') id: number,
    @Query('cpf') cpf: string,
  ) {
    const customerUpdated = await this.setCustomerCpfUseCase.execute(id, cpf);
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'Customer updated successfully',
      data: customerUpdated,
    };
  }

  @Get('by-cpf')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customer retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Customer not found.',
  })
  async customerByCpf(@Query('cpf') cpf: string) {
    const customer = await this.getCustomerByCpfUseCase.execute(cpf);
    return {
      statusCode: HttpStatus.OK,
      message: 'Customer retrieved successfully',
      data: customer,
    };
  }
}
