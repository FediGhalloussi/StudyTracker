import { InputType, Field } from '@nestjs/graphql';
import {IsNotEmpty, IsOptional, Matches} from 'class-validator';

@InputType()
export class CreateSubjectInput {
    @Field()
    @IsNotEmpty({ message: 'Le nom ne peut pas être vide' })
    name!: string;

    @Field()
    @IsOptional()
    @Matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, {
        message: 'Le code couleur doit être au format hexadécimal (ex: #FF9900)',
    })
    color?: string ;

    @Field()
    @IsOptional()
    icon?: string;
}
