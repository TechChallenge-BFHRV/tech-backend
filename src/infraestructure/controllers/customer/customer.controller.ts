import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FastifyReply } from 'fastify';

@Controller('customer')
export class CustomerController {
  @Post()
  async createCustomer(
    @Res() response: FastifyReply,
    @Query('name') name: string,
    @Query('cpf') cpf?: string,
  ) {
    const prisma = new PrismaClient();
    const customer = await prisma.customer.create({
      data: {
        name: name,
        cpf: cpf,
      },
    });
    return response.status(201).send(customer);
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
