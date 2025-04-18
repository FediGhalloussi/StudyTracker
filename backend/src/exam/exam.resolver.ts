
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Exam } from './exam.model';
import { CreateExamInput } from './exam.input';
import { ExamService } from './exam.service';

@Resolver(() => Exam)
export class ExamResolver {
  constructor(private service: ExamService) {}

  @Query(() => [Exam])
  getAllExams() {
    return this.service.getAll();
  }

  @Mutation(() => Exam)
  createExam(@Args('data') data: CreateExamInput) {
    return this.service.create(data);
  }
  @Mutation(() => Boolean)
  async deleteExam(@Args('id') id: string): Promise<boolean> {
    return this.service.delete(id);
  }
}
