/* eslint-disable prettier/prettier */
import { Repository, EntityRepository } from "typeorm";

import { Order } from "./order.entity";
import { OrderItem } from "./order_item.entity";

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
    async getOrders(user_id): Promise<any> {
        const orders = await this.createQueryBuilder('order')
        .where('order.seller_id', user_id)
        .innerJoin('order.buyer', 'buyer')
        .innerJoin('order.seller', 'seller')
        .innerJoin('order.items', 'items')
        .innerJoin('items.details', 'details')
        .select(['order.order_id', 'buyer.name', 'buyer.email', 'seller.name', 'seller.email', 'items.order_item_id', 'items.item_id', 'details.name', 'details.price'])
        .orderBy('order.created_at', 'DESC')
        .limit(2)
        .getMany()

        return orders;
    }
    async createOrder(data): Promise<any> {
        const order= new Order();

        order.seller_id = data.seller_id;
        order.buyer_id = data.buyer_id;
        
        await order.save();

        const order_items = data.items
        const items = []

        order_items.forEach(async element => {
            if(element.item_id != null && element.item_id != 0) {         
                const item = new OrderItem()

                item.order_id = order.order_id
                item.item_id = element.item_id
                await item.save()

                items.push(item)
            }
        });

        return {
            'items': order_items.length > 0 ? order_items : [],
            ...order
        };
    }
}