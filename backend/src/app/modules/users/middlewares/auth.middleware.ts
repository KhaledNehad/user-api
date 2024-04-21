import { ExpressRequest } from '@app/app/types/expressRequest.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UsersService } from '../users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decoded: JwtPayload = verify(
        token,
        process.env.JWT_SECRET,
      ) as JwtPayload;

      const user = await this.userService.findById(decoded.id);

      req.user = user;
      next();
    } catch (err) {
      req.user = null;

      next();
    }
  }
}
