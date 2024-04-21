import { ExpressRequest } from '@app/app/types/expressRequest.interface';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    const user = request.user;

    if (!user) {
      throw new HttpException('User not Authorized', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
