/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserRegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  role_id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}