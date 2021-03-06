import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { JwtModule } from './jwt/jwt.module';
import { QuestionModule } from './question/question.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { Question } from './question/entities/question.entitiy';
import { Verification } from './user/entities/verification.entity';
import { SeriesModule } from './series/series.module';
import { UserRecord } from './user/entities/user-record.entity';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: true,
      entities: [User, Question, Verification, UserRecord],
    }),
    JwtModule.forRoot({
      privateKey: process.env.SECRET_KEY,
    }),
    QuestionModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      // 나중에 context도 해야함 ( 유저 데코레이터 접근 필요 )
    }),
    SeriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }
}
/*
GraphQLModule.forRoot({
      autoSchemaFile: true,
      // 나중에 context도 해야함 ( 유저 데코레이터 접근 필요 )
    }),
*/
