import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  @Get()
  getAllUsers() {
    return 'Get all users';
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return `Create user with data ${JSON.stringify(createUserDto)}`;
  }

  @Get(':id')
  getProfile(@Param('id') id: string) {
    return `Get profile of user with id ${id}`;
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return `Update user with id ${id} with data ${JSON.stringify(updateUserDto)}`;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return `Delete user with id ${id}`;
  }
}
