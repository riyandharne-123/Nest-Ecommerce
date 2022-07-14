/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module } from '@nestjs/common';

//Imported TypeOrmModule and UserRepository
import { TypeOrmModule } from '@nestjs/typeorm';

//import for passport and nestjs
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from '../auth/jwt.strategy';
import { SellerMiddleware } from 'src/guards/seller.guard';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';

import { UserRepository } from 'src/auth/user.repository';
import { OrderRepository } from './order.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, OrderRepository]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'jwt-secret',
      signOptions: {
        expiresIn: 3600,
      }
    }),
  ],
  controllers: [OrderController],
  providers: [JwtStrategy, OrderService]
})
export class OrderModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SellerMiddleware).forRoutes('api/order/get');
  }
}
