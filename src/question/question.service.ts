import { Injectable } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/core/output/core.output';
import { Repository } from 'typeorm';
import { Question, checkAnswerOutput } from './entities/question.entitiy';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly question: Repository<Question>,
  ) {}

  async createQuestion({
    answer,
    grade,
    choices,
    question,
  }): Promise<CoreOutput> {
    try {
      await this.question.save(
        this.question.create({ answer, grade, choices, question }),
      );
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async checkAnswer({ id, input }): Promise<checkAnswerOutput> {
    try {
      const answer = this.question.findOne({ id });
      if (answer === input) {
        return {
          isCorrect: true,
        };
      } else {
        return {
          isCorrect: false,
        };
      }
    } catch (error) {
      return {
        error,
      };
    }
  }

  async getQuestion({ id }): Promise<Question | string> {
    const exist = await this.question.findOne({ id });
    if (exist) {
      return exist;
    } else {
      return 'No Question is found with this ID';
    }
  }
}
