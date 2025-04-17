import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Subject } from '../subject/subject.model';
import { Assignment } from '../assignment/assignment.model';
import { Exam } from '../exam/exam.model';

@ObjectType()
export class Chapter {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  examPassed?: boolean;

  @Field()
  createdAt!: Date;

  @Field(() => Subject)
  subject!: Subject;

  @Field(() => [Assignment], { nullable: true })
  assignments?: Assignment[];

  @Field(() => [Exam], { nullable: true })
  exams?: Exam[];
}
