import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CoreEntity } from 'src/core/entity/core.entity';
import { Column, Entity } from 'typeorm';

enum Grade {
  ONE,
  TWO,
  THREE,
}

registerEnumType(Grade, { name: 'Grade' });

@Entity()
@ObjectType()
export class Question extends CoreEntity {
  @Field(() => Grade)
  @Column()
  grade: Grade;

  @Field(() => [String])
  @Column('text', { array: true })
  choices: string[];

  @Field(() => Number)
  @Column()
  answer: number;

  @Field(() => String)
  @Column()
  question: string;
}
