import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Exam } from '../exam/exam.model';
import { Assignment } from '../assignment/assignment.model';
import { RevisionPlan } from '../revision-plan/revision-plan.model';

@ObjectType()
export class Task {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  type!: string; // 'EXAM' | 'ASSIGNMENT'

  @Field()
  scheduledAt!: Date;

  @Field()
  duration!: number; // minutes

  @Field()
  done?: boolean;

  @Field()
  createdAt!: Date;

  @Field(() => Assignment, { nullable: true })
  assignment?: Assignment;

  @Field(() => Exam, { nullable: true })
  exam?: Exam;

  @Field(() => RevisionPlan, { nullable: true })
  revisionPlan?: RevisionPlan;
}
