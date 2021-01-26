import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreOutput {
  @Field(() => String)
  error?: string;

  @Field(() => Boolean)
  ok: boolean;
}
