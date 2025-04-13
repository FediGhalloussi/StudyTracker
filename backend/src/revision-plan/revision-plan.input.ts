import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsDateString } from 'class-validator';

@InputType()
export class CreateRevisionPlanInput {
  @Field()
  @IsNotEmpty({ message: 'Le titre est requis' })
  title!: string;

  @Field()
  @IsDateString({}, { message: 'La date de début doit être au format ISO' })
  startDate!: string;

  @Field()
  @IsDateString({}, { message: 'La date de fin doit être au format ISO' })
  endDate!: string;
}
