import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddItemToOrderDTO } from '../../infrastructure/dto/order-item/add-item-to-order-dto';
import { CreateOrderDTO } from '../../infrastructure/dto/order/create-order-dto';
import { AddItemToOrderUseCase, GetAllOrdersUseCase } from '../usecases';
import { CreateOrderUseCase } from '../usecases/orders/create-order-usecase';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly addItemToOrderUseCase: AddItemToOrderUseCase,
    private readonly getAllOrdersUseCase: GetAllOrdersUseCase,
  ) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'List of all orders retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request.',
  })
  async getOrders() {
    const allOrders = await this.getAllOrdersUseCase.execute();
    return {
      statusCode: HttpStatus.OK,
      message: 'List of all orders retrieved successfully',
      data: allOrders.map((el) => ({
        id: el.id,
        totalPrice: el.totalPrice,
        status: el.status,
        createdAt: el.createdAt,
        updatedAt: el.updatedAt,
        customerId: el.customerId,
        items: el.orderItems.map((orderItem) => orderItem.Item),
      })),
    };
  }

  @Post('add-to-cart')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Item added successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  async addItemToCart(@Body() orderItem: AddItemToOrderDTO) {
    const itemAdded = await this.addItemToOrderUseCase.execute(orderItem);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Item added to order successfully',
      data: itemAdded,
    };
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Order created successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  async createOrder(@Body() order: CreateOrderDTO) {
    const orderCreated = await this.createOrderUseCase.execute(order);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Order created successfully',
      data: orderCreated,
    };
  }
}
