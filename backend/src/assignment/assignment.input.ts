import { InputType, Field, ID } from '@nestjs/graphql';
import {IsNotEmpty, IsUUID, IsDateString, IsOptional} from 'class-validator';
import { Status } from '@prisma/client';

@InputType()
export class CreateAssignmentInput {
  @Field()
  @IsNotEmpty({ message: 'Le titre ne peut pas être vide' })
  title!: string;

  @Field()
  @IsDateString({}, { message: 'La date de rendu doit être une date ISO valide' })
  dueAt!: string;

  @Field(() => Status)
  status!: Status;

  @Field(() => ID)
  @IsUUID('4', { message: 'L’ID du sujet doit être un UUID valide' })
  subjectId!: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID('4', { message: 'L’ID du chapitre doit être un UUID valide' })
  chapterId?: string;
}
