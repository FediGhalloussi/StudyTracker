import { InputType, Field, ID } from '@nestjs/graphql';
import {IsNotEmpty, IsIn, IsUUID, IsDateString, IsInt, Min, IsBoolean, IsOptional} from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsNotEmpty({ message: 'Le titre ne peut pas être vide' })
  title!: string;

  @Field()
  @IsIn(['EXAM', 'ASSIGNMENT'], { message: 'Le type doit être EXAM ou ASSIGNMENT' })
  type!: string;

  @Field()
  @IsDateString({}, { message: 'La date prévue doit être une date valide ISO' })
  scheduledAt!: string;

  @Field()
  @IsInt({ message: 'La durée doit être un entier (en minutes)' })
  @Min(1)
  duration!: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean({ message: 'Le champ done doit être un booléen' })
  done?: boolean;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID('4', { message: "L'ID du plan est invalide" })
  revisionPlanId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID('4', { message: "L'ID du devoir est invalide" })
  assignmentId?: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsUUID('4', { message: "L'ID de l'exam est invalide" })
  examId?: string;
}

