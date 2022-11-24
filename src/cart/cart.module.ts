import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderModule } from '../order/order.module';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { CartService } from './services';

@Module({
  imports: [
    OrderModule,
    TypeOrmModule.forFeature([Cart]),
    TypeOrmModule.forFeature([CartItem]),
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
