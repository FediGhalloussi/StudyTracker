import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Subject } from '../subject/subject.model';
import { Chapter } from '../chapter/chapter.model';
import { Task } from '../task/task.model';

@ObjectType()
export class Assignment {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  dueAt!: Date;

  @Field()
  createdAt!: Date;

  @Field(() => Subject)
  subject!: Subject;

  @Field(() => Chapter, { nullable: true })
  chapter?: Chapter;

  @Field(() => [Task], { nullable: true })
  tasks?: Task[];
}
