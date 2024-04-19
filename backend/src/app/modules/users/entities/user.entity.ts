import {
  BeforeInsert,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @Column()
  email: string;
}
