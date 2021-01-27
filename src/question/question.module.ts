import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';

@Module({
  providers: [QuestionService],
})
export class QuestionModule {}
