/* eslint-disable prettier/prettier */
import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { OrderItem } from './order_item.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  seller_id: number;

  @Column()
  buyer_id: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  @ManyToOne(type => User, user => user.user_id)
  @JoinColumn({name : 'seller_id', referencedColumnName: 'user_id'})
  seller: User;

  @ManyToOne(type => User, user => user.user_id)
  @JoinColumn({name : 'buyer_id', referencedColumnName: 'user_id'})
  buyer: User;

  @OneToMany(type => OrderItem, item => item.order)
  @JoinColumn({name : 'order_id', referencedColumnName: 'order_id'})
  items: OrderItem[];
}