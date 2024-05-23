import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CustomerModel } from '../../../domain/models/customers.model';
export class CreateCustomerDTO implements CustomerModel {
  orders?: number[];
  id: number;
  createdAt: Date;
  updatedAt: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string = 'Cliente não identificado';

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  cpf?: string;
}
