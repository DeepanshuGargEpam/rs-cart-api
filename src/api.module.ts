import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [AuthModule, CartModule, OrderModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}