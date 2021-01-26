import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/core/output/core.output';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async createUser({ username, email, password }): Promise<CoreOutput> {
    const existEmail = await this.users.findOne({ email });
    const existUsername = await this.users.findOne({ username });
    if (existEmail || existUsername) {
      return {
        ok: false,
        error:
          'Email or Username already taken \n 이메일 혹은 아이디가 이미 사용중입니다',
      };
    }
    try {
      await this.users.save(
        this.users.create({ username, email, password, point: 0 }),
      );
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

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
