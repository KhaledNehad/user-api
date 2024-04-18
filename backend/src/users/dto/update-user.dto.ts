import { CreateUserDto } from './create-user.dto';
import { PickType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PickType(CreateUserDto, [
  'fullName',
  'phoneNumber',
  'dateOfBirth',
  'password',
]) {}
