import { Field, InputType } from '@nestjs/graphql';

@InputType()
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
