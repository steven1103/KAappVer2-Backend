import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/core/output/core.output';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './entities/user.service.entity';

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
        this.users.create({
          username,
          email,
          password,
          point: 0,
          isVerified: false,
        }),
      );
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  async updateUser(
    userId: number,
    { username, email, password, isVerified }: UpdateUserInput,
  ): Promise<CoreOutput> {
    try {
      this.users.update(userId, { username, email, password, isVerified });
      return {
        ok: true,
        error: null,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async updatePoint(userId: number, addpoint: number): Promise<CoreOutput> {
    const currentPoint = (await this.users.findOne({ id: userId })).point;
    const point = currentPoint + addpoint;
    try {
      await this.users.update(userId, { point });
      return {
        ok: true,
        error: null,
      };
    } catch (error) {
      return {
        ok: false,
        error,
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

  async deleteUser({ id }): Promise<CoreOutput> {
    const user = await this.users.find({ id });
    if (!user) {
      try {
        this.users.delete(id);
        return {
          ok: true,
          error: null,
        };
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    }
  }

  async rankUser(): Promise<Array<User>> {
    function NumberCompare(a, b) {
      return b.point - a.point;
    }
    const everyUser = this.users.find();
    const sortedUser = (await everyUser).sort(NumberCompare);
    const topTwentyUser = [];
    for (let i = 0; i < sortedUser.length; i++) {
      if (i >= 20) {
        break;
      }
      topTwentyUser.push(
        i +
          1 +
          '등 : ' +
          sortedUser[i].username +
          ' ' +
          sortedUser[i].point +
          '회',
      );
    }
    return topTwentyUser;
  }
}
