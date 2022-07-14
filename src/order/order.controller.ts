/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common';

import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@UseGuards(JwtAuthGuard)
@Controller('api/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

    @Get('/get')
    async getSellerOrders(@Request() req): Promise<any> {
        return await this.orderService.getOrders(req.user.user_id)
    }

    @Post('/create')
    async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<any> {
        return await this.orderService.createOrder(createOrderDto)
    }
}