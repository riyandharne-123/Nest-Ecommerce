/* eslint-disable prettier/prettier */
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  seller_id: number;

  @IsNotEmpty()
  buyer_id: number;

  @IsNotEmpty()
  @IsArray()
  items: [
    {
      item_id: number
    }
  ]
}