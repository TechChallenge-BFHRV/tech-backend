import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FastifyReply } from 'fastify';
import { CreateCustomerUseCase } from '../../../application/usecases/create-customer.usecase';
import { CreateCustomerDTO } from '../../dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private createCustomerUseCase: CreateCustomerUseCase) {}

  @Post()
  async createCustomer(
    @Res() response: FastifyReply,
    @Body() customer: CreateCustomerDTO,
  ) {
    const customerCreated = await this.createCustomerUseCase.execute(customer);
    return response.status(HttpStatus.CREATED).send(customerCreated);
  }

  @Get('by-cpf')
  async customerByCpf(
    @Res() response: FastifyReply,
    @Query('cpf') cpf: string,
  ) {
    const prisma = new PrismaClient();
    const customer = await prisma.customer.findUnique({
      where: {
        cpf: cpf,
      },
    });
    if (!customer) {
      return response.status(404).send(null);
    }
    return response.status(200).send(customer);
  }
}
