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
import { AddItemToOrderDTO } from '../../infrastructure/dto/order-item/add-item-to-order-dto';
import { CreateOrderDTO } from '../../infrastructure/dto/order/create-order-dto';
import {
  AddItemToOrderUseCase,
  GetAllOrdersUseCase,
  GetCartOrderUseCase,
  OrderStepBackwardUseCase,
  OrderStepForwardUseCase,
} from '../usecases';
import { SetItemToOrderUseCase } from '../usecases/order-items/set-item.usecase';
import { CreateOrderUseCase } from '../usecases/orders/create-order-usecase';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly addItemToOrderUseCase: AddItemToOrderUseCase,
    private readonly getAllOrdersUseCase: GetAllOrdersUseCase,
    private readonly setItemToOrderUseCase: SetItemToOrderUseCase,
    private readonly getCartOrderUseCase: GetCartOrderUseCase,
    private readonly orderStepForwardUseCase: OrderStepForwardUseCase,
    private readonly orderStepBackwardUseCase: OrderStepBackwardUseCase,
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
        step: el.step,
        createdAt: el.createdAt,
        updatedAt: el.updatedAt,
        customerId: el.customerId,
        items: el?.orderItems?.map((orderItem) => {
          return { orderItemId: orderItem.id, ...orderItem.Item };
        }),
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

  @Put('remove-from-cart')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Order Item remove successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  async setOrderItemId(@Query('orderItemId') orderItemId: number) {
    const orderItemUpdated =
      await this.setItemToOrderUseCase.execute(orderItemId);
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'Order Item updated successfully',
      data: orderItemUpdated,
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

  @Get(':id/cart')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Order created successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  async GetCartOrder(@Param('id') id: number) {
    const orderCreated = await this.getCartOrderUseCase.execute(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order created successfully',
      data: {
        id: orderCreated.id,
        totalPrice: orderCreated.totalPrice,
        finalPrice: orderCreated.finalPrice,
        preparationTime: orderCreated.preparationTime,
        status: orderCreated.status,
        createdAt: orderCreated.createdAt,
        updatedAt: orderCreated.updatedAt,
        customerId: orderCreated.customerId,
        items: orderCreated?.orderItems?.map((orderItem) => {
          return { orderItemId: orderItem.id, ...orderItem.Item };
        }),
      },
    };
  }

  @Post(':orderId/step-forward')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Step advanced successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed to advance step.',
  })
  async orderStepForward(@Param('orderId') orderId: number) {
    const updatedOrder = await this.orderStepForwardUseCase.execute(orderId);
    return updatedOrder;
  }

  @Post(':orderId/step-backward')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Step receded successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Failed to recede step.',
  })
  async orderStepBackward(@Param('orderId') orderId: number) {
    const updatedOrder = await this.orderStepBackwardUseCase.execute(orderId);
    return updatedOrder;
  }
}
