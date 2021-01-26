import { Field } from '@nestjs/graphql';

export class UpdateUserInput {
  @Field(() => String)
  username?: string;

  @Field(() => String)
  email?: string;

  @Field(() => String)
  password?: string;

  @Field(() => Boolean)
  isVerified?: boolean;
}
