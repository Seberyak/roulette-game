import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './dto/user.entity';
import { UserLocalDb } from './user.local-db';

@Injectable()
export class UsersService {
  private readonly users = UserLocalDb.users;

  async findOne(username: string): Promise<User> {
    return this.users.find((user) => user.username === username);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async getUserData(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }
    const { password, ...userData } = user;

    return userData;
  }
}
