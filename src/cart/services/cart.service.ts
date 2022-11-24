import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart } from '../entities/cart.entity';
import { CartItem } from '../entities/cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemsRepository: Repository<CartItem>,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    const cart = await this.cartsRepository.findOne({
      where: {
        id: userId,
      },
    });

    const items = await this.cartItemsRepository.find({
      where: {
        cartId: userId,
      },
    });

    return Object.assign({}, cart, {
      items,
    });
  }

  async createByUserId(userId?: string): Promise<Cart> {
    const cart = this.cartsRepository.create({
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return Object.assign({}, cart, {
      items: [],
    });
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    return (await this.findByUserId(userId)) ?? this.createByUserId();
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    // Remove all existing items
    const cart = await this.findOrCreateByUserId(userId);
    for (const item of cart.items) {
      await this.cartItemsRepository.delete({ id: item.id });
    }

    // Insert new items
    for (const item of items) {
      this.cartItemsRepository.create({
        cartId: userId,
        productId: item.productId,
        count: item.count,
      });
    }

    // Update cart
    await this.cartsRepository.update(
      { id: userId },
      {
        updatedAt: new Date(),
      },
    );

    return this.findByUserId(userId);
  }

  async removeByUserId(userId: string): Promise<void> {
    // Remove all existing items
    const cart = await this.findOrCreateByUserId(userId);
    for (const item of cart.items) {
      await this.cartItemsRepository.delete({ id: item.id });
    }

    // Remove cart
    await this.cartsRepository.delete({ id: userId });
  }
}
