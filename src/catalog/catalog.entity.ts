/* eslint-disable prettier/prettier */
import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, Unique, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Item } from './item.entity';

@Entity()
@Unique(['user_id'])
export class Catalog extends BaseEntity {
  @PrimaryGeneratedColumn()
  catalog_id: number;

  @Column()
  user_id: number;

  @Column()
  name: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  @OneToOne(type => User, user => user.user_id)
  @JoinColumn({name : 'user_id', referencedColumnName: 'user_id'})
  seller: User;

  @OneToMany(type => Item, item => item.catalog)
  @JoinColumn({name : 'catalog_id', referencedColumnName: 'catalog_id'})
  items: Item[];
}