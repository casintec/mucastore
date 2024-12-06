import { PartialType } from '@nestjs/mapped-types';
import { InsertCartDto } from './insert-cart.dto';
import { IsNumber } from 'class-validator';

export class UpdateCartDto extends PartialType(InsertCartDto) {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;

}
