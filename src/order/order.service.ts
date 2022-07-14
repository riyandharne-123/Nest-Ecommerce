/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderRepository)
        private orderRepository: OrderRepository
    ){}

    async getOrders(user_id): Promise<any> {
        return await this.orderRepository.getOrders(user_id)
     }

    async createOrder(data): Promise<any> {
       return await this.orderRepository.createOrder(data);
    }
}