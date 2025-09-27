import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";
import { user } from "../../common/types.js";


export class CreatePortfolioDto {

    @ApiProperty({ example: 'Trip', description: 'portfolio`s contain name' })
    @IsString()
    @Length(1, 100, { message: 'Not more than 100 symbols' })
    name!: string;

    @ApiProperty({ example: 'It was a wonderful day. The sky was covered with clouds.', description: 'portfolio`s contain name' })
    @IsString()
    @Length(1, 250, { message: 'Not more than 250 symbols' })
    description!: string;

    user!: user

}