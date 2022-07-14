/* eslint-disable prettier/prettier */
import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Item } from 'src/catalog/item.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_item_id: number;

  @Column()
  order_id: number;

  @Column()
  item_id: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  @ManyToOne(type => Order, order => order.order_id)
  @JoinColumn({name : 'order_id', referencedColumnName: 'order_id'})
  order: Order;

  @ManyToOne(type => Item, item => item.item_id)
  @JoinColumn({name : 'item_id', referencedColumnName: 'item_id'})
  details: Item;
}