/* eslint-disable prettier/prettier */
import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  role_id: number; //1 buyer, 2 seller

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;
}