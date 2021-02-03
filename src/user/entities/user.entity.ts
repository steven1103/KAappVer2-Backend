import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreEntity } from 'src/core/entity/core.entity';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { MutationOutPut } from 'src/core/entity/core.output';
@Entity()
@ObjectType()
export class User extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  username: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column({ select: false })
  password: string;

  @Field(() => Number)
  @Column()
  point: number;

  @Field(() => Boolean)
  @Column({ default: false })
  isVerified: boolean;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}

@InputType()
export class LoginInput {
  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  password: string;
}

@ObjectType()
export class LoginOutput extends MutationOutPut {
  @Field((type) => String, { nullable: true })
  token?: string;
}
