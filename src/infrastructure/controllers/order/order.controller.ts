import { Controller, Get, Post, Res } from '@nestjs/common';
import { PrismaClient, Status, Step } from '@prisma/client';

@Controller('order')
export class OrderController {
  @Post()
  async create(@Res() response) {
    const prisma = new PrismaClient();

    const order = await prisma.order.create({
      data: {
        status: Status.STARTED,
        step: Step.START,
      },
    });

    return response.status(201).send(order);
  }

  @Get()
  async findAll(@Res() response) {
    const prisma = new PrismaClient();
    const allOrders = await prisma.order.findMany();
    return response.status(200).send(allOrders);
  }
}
