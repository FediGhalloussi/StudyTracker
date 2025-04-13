import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Task } from '../task/task.model';

@ObjectType()
export class RevisionPlan {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  startDate!: Date;

  @Field()
  endDate!: Date;

  @Field()
  createdAt!: Date;

  @Field(() => [Task], { nullable: true })
  tasks?: Task[];
}
