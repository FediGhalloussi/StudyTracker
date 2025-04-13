import { InputType, Field, ID } from '@nestjs/graphql';
import {IsNotEmpty, IsUUID, IsBoolean, IsOptional} from 'class-validator';

@InputType()
export class CreateChapterInput {
  @Field()
  @IsNotEmpty({ message: 'Le titre ne peut pas être vide' })
  title!: string;

  @Field()
  @IsOptional()
  @IsBoolean({ message: 'Le champ examPassed doit être un booléen' })
  examPassed?: boolean;

  @Field(() => ID)
  @IsUUID('4', { message: 'L’ID du sujet doit être un UUID valide' })
  subjectId!: string;
}
