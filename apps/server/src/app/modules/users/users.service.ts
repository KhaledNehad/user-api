import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '@app/app/common/dto/pagination-query.dto';
import { sign } from 'jsonwebtoken';
import { UserResponseInterface } from './types/userResponse.interface';
import { compare, genSalt, hash } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  //! Register user
  async register(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (userByEmail) {
      throw new HttpException(
        'Email already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  //! Login user
  async login({ email, password }: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'username', 'email', 'password'],
    });

    if (!user) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.UNAUTHORIZED,
      );
    }

    delete user.password;
    return user;
  }

  //! Current user
  async currentUser() {
    return { message: 'This action returns current user' };
  }

  //! Find one user
  async findById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  //! Find all users
  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.userRepository.find({
      skip: offset,
      take: limit,
    });
  }

  //! Update user
  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.findById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const hashedPassword = await this.hashUpdatePassword(
      updateUserDto.password,
    );

    Object.assign(user, updateUserDto, { password: hashedPassword });

    return await this.userRepository.save(user);
  }

  //! Remove user
  removeUser(id: string) {
    if (!id || id === '') {
      throw new HttpException('Id not provided', HttpStatus.BAD_REQUEST);
    }

    if (!this.findById(id)) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.userRepository.delete(id);
  }

  generateToken(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );
  }

  hashUpdatePassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      genSalt(10, (err, salt) => {
        if (err) {
          reject(
            new HttpException(
              'Something went wrong',
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          );
        }

        hash(password, salt, (err, hashedPassword) => {
          if (err) {
            reject(
              new HttpException(
                'Something went wrong',
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          }

          resolve(hashedPassword);
        });
      });
    });
  }

  // bcrypt.genSalt(10,(err,salt) => {
  //  	bcrypt.hash(newUser.password, salt , (err, hash) =>{
  //       if(err) throw (err);

  //       newUser.password=hash;
  //       newUser.save(callback);
  //  	});
  //  });

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateToken(user),
      },
    };
  }
}
