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
import { Status } from '@prisma/client';
import { AddItemToOrderDTO } from '../../infrastructure/dto/order-item/add-item-to-order-dto';
import {
  AddItemToOrderUseCase,
  GetAllOrdersUseCase,
  GetCartOrderUseCase,
  GetOrdersByStatusUseCase,
  OrderStepBackwardUseCase,
  OrderStepForwardUseCase,
  SetOrderToCancelledUseCase,
  SetOrderToFinishedUseCase,
  SetOrderToPrepareUseCase,
  SetOrderToReadyUseCase,
} from '../usecases';
import { SetItemToOrderUseCase } from '../usecases/order-items/set-item.usecase';
import { CreateOrderUseCase } from '../usecases/orders/create-order-usecase';
import { GetOrderByIdUseCase } from '../usecases/orders/get-order-by-id.usecase';

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
    private readonly getOrdersByStatusUseCase: GetOrdersByStatusUseCase,
    private readonly getOrderByIdUseCase: GetOrderByIdUseCase,
    private readonly setOrderToPrepareUseCase: SetOrderToPrepareUseCase,
    private readonly setOrderToReadyUseCase: SetOrderToReadyUseCase,
    private readonly setOrderToFinishedUseCase: SetOrderToFinishedUseCase,
    private readonly setOrderToCancelledUseCase: SetOrderToCancelledUseCase,
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

  @Get('/:id')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Order per ID retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request.',
  })
  async getOrder(@Param('id') orderId: number) {
    const order = await this.getOrderByIdUseCase.execute(orderId);
    if (!order) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: `Order with ID #${orderId} not found!`,
        data: order,
      };
    }
    return {
      statusCode: HttpStatus.OK,
      message: `Order with ID #${orderId} retrieved successfully`,
      data: order,
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
  async createOrder() {
    const orderCreated = await this.createOrderUseCase.execute();
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Order created successfully',
      data: orderCreated,
    };
  }

  @Get(':id/cart')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully retrieved cart.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Order not found',
  })
  async GetCartOrder(@Param('id') id: number) {
    const orderCreated = await this.getCartOrderUseCase.execute(id);
    return {
      statusCode: HttpStatus.OK,
      message: `Successfully retrieved cart of order #${id}.`,
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

  @Put(':orderId/step-forward')
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

  @Put(':orderId/step-backward')
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

  @Get('status/:orderStatus')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Orders succesffully retrieved by status.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request.',
  })
  async getOrdersByStatus(@Param('orderStatus') orderStatus: Status) {
    const orders = await this.getOrdersByStatusUseCase.execute(orderStatus);
    return {
      statusCode: HttpStatus.OK,
      message: `Orders succesffully retrieved by status ${orderStatus}.`,
      amountOfOrders: orders.length,
      data: orders,
    };
  }

  @Put(':orderId/prepare')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Order started to be prepared.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request.',
  })
  async setToPrepare(@Param('orderId') orderId: number) {
    const orders = await this.setOrderToPrepareUseCase.execute(orderId);
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: `Order started to be prepared.`,
      data: orders,
    };
  }

  @Put(':orderId/ready')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Order status changed to ready.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request.',
  })
  async setToReady(@Param('orderId') orderId: number) {
    const orders = await this.setOrderToReadyUseCase.execute(orderId);
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: `Order status changed to ready.`,
      data: orders,
    };
  }

  @Put(':orderId/finished')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Order status changed to finished.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request.',
  })
  async setToFinished(@Param('orderId') orderId: number) {
    const orders = await this.setOrderToFinishedUseCase.execute(orderId);
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: `Order status changed to finished.`,
      data: orders,
    };
  }

  @Put(':orderId/cancelled')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'Order status changed to cancelled.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request.',
  })
  async setToCancelled(@Param('orderId') orderId: number) {
    const orders = await this.setOrderToCancelledUseCase.execute(orderId);
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: `Order status changed to cancelled.`,
      data: orders,
    };
  }
}
