import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { CreateCustomerUseCase } from '../../application/usecases/customers/create-customer.usecase';
import { GetCustomerByCpfUseCase } from '../../application/usecases/customers/get-customer-by-cpf.usecase';
import { SetCustomerCpfUseCase } from '../../application/usecases/customers/set-customer-cpf.usecase';
import { CreateCustomerDTO } from '../dto/customer/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(
    private createCustomerUseCase: CreateCustomerUseCase,
    private setCustomerCpfUseCase: SetCustomerCpfUseCase,
    private getCustomerByCpfUseCase: GetCustomerByCpfUseCase,
  ) {}

  @Post()
  async createCustomer(
    @Res() response: FastifyReply,
    @Body() customer: CreateCustomerDTO,
  ) {
    const customerCreated = await this.createCustomerUseCase.execute(customer);
    return response.status(HttpStatus.CREATED).send(customerCreated);
  }

  @Put(':customerId')
  async setCustomerCpf(
    @Res() response: FastifyReply,
    @Param('customerId') id: number,
    @Query('cpf') cpf: string,
  ) {
    const customerUpdated = await this.setCustomerCpfUseCase.execute(id, cpf);
    return response.status(HttpStatus.ACCEPTED).send(customerUpdated);
  }

  @Get('by-cpf')
  async customerByCpf(
    @Res() response: FastifyReply,
    @Query('cpf') cpf: string,
  ) {
    const customer = await this.getCustomerByCpfUseCase.execute(cpf);
    return response.status(HttpStatus.OK).send(customer);
  }
}
