/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { MutationOutPut } from 'src/core/entity/core.output';
import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  username: string;
}

@ObjectType()
export class createAccountOutput extends MutationOutPut {}
