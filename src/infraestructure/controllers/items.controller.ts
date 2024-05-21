import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateItemUseCase } from '../../application/usecases/create-item.usecase';
import { CreateItemDTO } from '../dto/create-item.dto';

@Controller('items/')
export class ItemController {
  constructor(private createItemUseCase: CreateItemUseCase) {}

  @Post()
  async createItem(@Res() response, @Body() item: CreateItemDTO): Promise<any> {
    const itemCreated = await this.createItemUseCase.execute(item);
    return response.status(HttpStatus.CREATED).send(itemCreated);
  }
}
