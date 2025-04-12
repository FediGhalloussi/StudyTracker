
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field()
  id!: string;

  @Field()
  title!: string;

  @Field()
  dueDate!: Date;

  @Field()
  createdAt!: Date;
}
