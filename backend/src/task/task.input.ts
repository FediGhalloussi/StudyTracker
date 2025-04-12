import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength, IsDateString } from 'class-validator';

@InputType()
export class CreateTaskInput {
    @Field()
    @IsNotEmpty({ message: "Le titre ne peut pas être vide" })
    @MinLength(3, { message: "Le titre doit contenir au moins 3 caractères" })
    title!: string;

    @Field()
    @IsDateString({}, { message: "La date est invalide" })
    dueDate!: string;
}
