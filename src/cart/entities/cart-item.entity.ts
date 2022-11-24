import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Cart, Product } from '../models';

@Entity('cart_items')
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  cartId?: string;
  cart?: Cart;

  @Column({ type: 'uuid', nullable: false })
  productId: string;
  product?: Product;

  @Column({ type: 'integer', nullable: false })
  count: number;
}