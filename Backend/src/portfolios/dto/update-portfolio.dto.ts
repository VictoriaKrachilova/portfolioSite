import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Length, Matches } from "class-validator";
import { user } from "../../common/dto/types.js";


export class UpdatePortfolioDto {

    @ApiProperty({ example: 'Trip', description: 'portfolio`s contain name', required: false })
    @IsString()
    @Length(1, 100, { message: 'Not more than 100 symbols' })
    @IsOptional()
    name?: string;

    @ApiProperty({ example: 'It was a wonderful day. The sky was covered with clouds.', description: 'portfolio`s contain name', required: false })
    @IsString()
    @Length(1, 250, { message: 'Not more than 250 symbols' })
    @IsOptional()
    description!: string;

    user!: user

}