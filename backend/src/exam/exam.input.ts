import { InputType, Field, ID } from '@nestjs/graphql';
import {IsUUID, IsDateString, IsInt, Min, IsOptional, IsDate} from 'class-validator';
import {Type} from "class-transformer";

@InputType()
export class CreateExamInput {
  @Field()
  @Type(() => Date) // transforme une string en Date
  @IsDate({ message: "Date must be a valid ISO 8601 date string" })
  date!: Date;


  @Field()
  @IsInt({ message: 'La durée doit être un entier' })
  @Min(1, { message: 'La durée doit être d’au moins 1 minute' })
  duration!: number;

  @Field(() => ID)
  @IsUUID('4', { message: 'L’ID du sujet est invalide' })
  subjectId!: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID('4', { message: 'L’ID du chapitre est invalide' })
  chapterId?: string;
}
