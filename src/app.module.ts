/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, CatalogModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
