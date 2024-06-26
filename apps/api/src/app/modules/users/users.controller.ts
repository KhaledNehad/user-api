import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '@app/app/common/dto/pagination-query.dto';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './decorators/user.decorator';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from './guards/auth.guard';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('auth/register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.usersService.register(createUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @Post('auth/login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.usersService.login(loginUserDto);
    return this.usersService.buildUserResponse(user);
  }

  // Get current user
  @Get('users/me')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.usersService.buildUserResponse(user);
  }

  // Update user
  @Patch('user/:id')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.usersService.updateUser(
      currentUserId,
      updateUserDto,
    );

    return this.usersService.buildUserResponse(user);
  }
  // Get all users
  @Get('users')
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.usersService.findAll(paginationQuery);
  }

  // Get user by id
  @Get('users/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  // Delete user
  @Delete('users/:id')
  @UseGuards(AuthGuard)
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
