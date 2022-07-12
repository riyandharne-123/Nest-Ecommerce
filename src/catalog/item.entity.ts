/* eslint-disable prettier/prettier */
import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Catalog } from './catalog.entity';

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  item_id: number;

  @Column()
  catalog_id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  @ManyToOne(type => Catalog, catalog => catalog.catalog_id)
  @JoinColumn({name : 'catalog_id', referencedColumnName: 'catalog_id'})
  catalog: Catalog;
}