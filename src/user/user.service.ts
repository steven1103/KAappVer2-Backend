import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async getUser({ username }): Promise<{ user?: User; ok: boolean }> {
    const exist = await this.users.findOne({ username });
    if (!exist) {
      return {
        ok: false,
      };
    }
    return {
      user: exist,
      ok: true,
    };
  }
}
