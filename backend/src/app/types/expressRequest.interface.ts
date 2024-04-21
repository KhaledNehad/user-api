import { UserEntity } from '../modules/users/entities/user.entity';
import { Request } from 'express';

export interface ExpressRequest extends Request {
  user?: UserEntity;
}
