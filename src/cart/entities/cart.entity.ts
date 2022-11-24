import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CartItem } from './cart-item.entity';

@Entity('carts')
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz', nullable: false })
  createdAt: Date;

  @Column({ type: 'timestamptz', nullable: false })
  updatedAt: Date;

  items: CartItem[];
}