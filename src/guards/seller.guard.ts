/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from 'src/auth/user.repository';
import { verify } from 'jsonwebtoken';

@Injectable()
export class SellerMiddleware implements NestMiddleware {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){}

  async use(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];

    if (!bearerHeader || !accessToken) {
        throw new UnauthorizedException('unauthorized');
    }

    const jwt = verify(
        accessToken,
        'jwt-secret',
    );
    
    const user = await this.userRepository.user(jwt['response']['user_id'])
        
    if (user == null) {
        throw new UnauthorizedException('unauthorized');
    }

    if(user.role_id != 2) {
        throw new UnauthorizedException('only sellers can access this route');
    }

    next();
  }
}
