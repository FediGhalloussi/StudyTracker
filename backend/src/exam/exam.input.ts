import { InputType, Field, ID } from '@nestjs/graphql';
import {IsUUID, IsDateString, IsInt, Min, IsOptional} from 'class-validator';

@InputType()
export class CreateExamInput {
  @Field()
  @IsDateString({}, { message: 'La date doit être au format ISO valide' })
  date!: string;

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
