/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  catalog_id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;
}