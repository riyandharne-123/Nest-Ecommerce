/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

//Imported TypeOrmModule and UserRepository
import { TypeOrmModule } from '@nestjs/typeorm';

//import for passport and nestjs
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from '../auth/jwt.strategy';
import { SellerMiddleware } from 'src/guards/seller.guard';

import { UserRepository } from 'src/auth/user.repository';
import { CatalogRepository } from './catalog.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, CatalogRepository]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'jwt-secret',
      signOptions: {
        expiresIn: 3600,
      }
    }),
  ],
  controllers: [CatalogController],
  providers: [CatalogService, JwtStrategy]
})
export class CatalogModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(SellerMiddleware).forRoutes('api/catalog/get', 'api/catalog/create', 'api/catalog/create/item');
    }
}
