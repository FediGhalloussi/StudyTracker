import { ObjectType, Field, ID } from '@nestjs/graphql';
import {Chapter} from "../chapter/chapter.model";
import {Assignment} from "../assignment/assignment.model";
import {Exam} from "../exam/exam.model";

@ObjectType()
export class Subject {
    @Field(() => ID)
    id!: string;

    @Field()
    name!: string;

    @Field()
    color!: string;

    @Field()
    icon!: string;

    @Field()
    createdAt!: Date;


    @Field(() => [Chapter], { nullable: true })
    chapters?: Chapter[];

    @Field(() => [Assignment], { nullable: true })
    assignments?: Assignment[];

    @Field(() => [Exam], { nullable: true })
    exams?: Exam[];
}
