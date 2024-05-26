import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCheckoutDTO } from '../../infrastructure/dto/checkout/create-checkout-dto';
import { CreateCheckoutUseCase } from '../usecases/checkout/create-checkout.usecase';

@ApiTags('checkout')
@Controller('checkout')
export class checkoutController {
  constructor(private readonly createCheckoutUseCase: CreateCheckoutUseCase) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Payment processed successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Payment cannot be processed.',
  })
  async createCheckout(@Body() createCheckout: CreateCheckoutDTO) {
    const checkout = await this.createCheckoutUseCase.execute(createCheckout);
    const isSuccess = checkout.status === 'APPROVED';
    return {
      statusCode: isSuccess ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      message: isSuccess
        ? 'Payment processed successfully.'
        : 'Payment cannot be processed.',
      data: checkout,
    };
  }
}
