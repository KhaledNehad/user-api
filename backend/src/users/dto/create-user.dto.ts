import { IsDate, IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly fullName?: string;

  @IsPhoneNumber()
  readonly phoneNumber?: string;

  @IsDate()
  readonly dateOfBirth?: Date;
}
