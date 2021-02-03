/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoreOutput } from 'src/core/output/core.output';
import { CreateAccountInput, createAccountOutput } from './dtos/user.dto';
import { LoginInput, LoginOutput, User } from './entities/user.entity';
import { UpdateUserInput } from './entities/user.service.entity';
import { UserService } from './user.service';
import { GraphQLUpload } from 'apollo-server-express';
import { createWriteStream } from 'fs';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      return this.userService.login(loginInput);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Mutation((returns) => CoreOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CoreOutput> {
    try {
      return await this.userService.createUser(createAccountInput);
    } catch (error) {
      return {
        error,
        ok: false,
      };
    }
  }

  @Mutation((returns) => CoreOutput)
  async updateUser(
    @Args('input') updateInput: UpdateUserInput,
  ): Promise<CoreOutput> {
    try {
      return this.userService.updateUser(updateInput);
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Mutation((returns) => CoreOutput)
  async seeUser(
    @Args({ name: 'username', type: () => String }) username: string,
  ): Promise<{ user?: User; ok: boolean }> {
    return this.userService.getUser(username);
  }

  @Mutation(() => CoreOutput)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
     file: any ,
  ): Promise<CoreOutput> {
    try {
      this.userService.upload(file)
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Query((returns) => [User])
  async rankUser(): Promise<Array<User>> {
    return this.userService.rankUser();
  }

  @Mutation((returns) => CoreOutput)
  async updatePoint(
    @Args({ name: 'userID', type: () => String }) userID: number,
    @Args({ name: 'addPoint', type: () => String }) addPoint: number,
  ): Promise<CoreOutput> {
    return this.userService.updatePoint(userID, addPoint);
  }

  @Mutation((returns) => CoreOutput)
  async deleteUser(
    @Args({ name: 'userID', type: () => String }) userID: number,
  ): Promise<CoreOutput> {
    return this.userService.deleteUser(userID);
  }
}
