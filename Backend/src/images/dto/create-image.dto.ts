import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";
import { user } from "../../common/types.js";


export class CreateImageDto {

    @ApiProperty({ example: 1, description: 'portfolio id' })
    @IsNumber()
    portfolioId!: number;

    @ApiProperty({ example: 'one photo', description: 'image`s contain name' })
    @IsString()
    @Length(1, 100, { message: 'Not more than 100 symbols' })
    name!: string;

    @ApiProperty({ example: 'It was a wonderful day. The sky was covered with clouds.', description: 'image`s contain name' })
    @IsString()
    @Length(1, 250, { message: 'Not more than 250 symbols' })
    description!: string;

    user!: user

}