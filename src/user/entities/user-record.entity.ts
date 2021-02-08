import { Field } from '@nestjs/graphql';
import { CoreEntity } from 'src/core/entity/core.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserRecord extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Number)
  @Column()
  streakPoint: number;

  @Field(() => Number)
  @Column()
  rank: number;

  @Field(() => Number)
  @Column()
  streakTime: number;

  @Field(() => Number)
  @Column()
  highestPoint: number;

  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
