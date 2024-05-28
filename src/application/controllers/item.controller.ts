import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemCategory } from '@prisma/client';
import { CreateItemDTO } from '../../infrastructure/dto/item/create-item.dto';
import {
  CreateItemUseCase,
  GetItemUseCase,
  GetItemsPerCategoryUseCase,
} from '../usecases';

@ApiTags('item')
@Controller('item')
export class ItemController {
  constructor(
    private readonly createItemUseCase: CreateItemUseCase,
    private readonly getItemUseCase: GetItemUseCase,
    private readonly getItemsPerCategoryUseCase: GetItemsPerCategoryUseCase,
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Item created successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  async createItem(@Body() item: CreateItemDTO) {
    const itemCreated = await this.createItemUseCase.execute(item);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Item created successfully',
      data: itemCreated,
    };
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Item retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Item not found.',
  })
  async getItems() {
    const item = await this.getItemUseCase.execute();
    return {
      statusCode: HttpStatus.OK,
      message: 'Item retrieved successfully',
      data: item,
    };
  }

  @Get('category/:itemCategory')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Items retrieved successfully.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Items not found.',
  })
  async getItemsPerCategory(@Param('itemCategory') category: ItemCategory) {
    const item = await this.getItemsPerCategoryUseCase.execute(category);
    return {
      statusCode: HttpStatus.OK,
      message: 'Items retrieved successfully',
      data: item,
    };
  }
}
