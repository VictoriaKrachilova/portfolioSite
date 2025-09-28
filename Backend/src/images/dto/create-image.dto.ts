import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Length } from "class-validator";
import { user } from "../../common/dto/types.js";
import { Type } from "class-transformer";


export class CreateImageDto {

    @ApiProperty({ example: 1, description: 'portfolio id' })
    @Type(() => Number)
    @IsNumber()
    portfolioId!: number;

    @ApiProperty({ example: 'one photo', description: 'image`s contain name' })
    @IsString()
    @Length(1, 100, { message: 'Not more than 100 symbols' })
    name!: string;

    @ApiProperty({ example: 'It was a wonderful day. The sky was covered with clouds.', description: 'image`s contain name' })
    @IsString()
    @Length(1, 250, { message: 'Not more than 250 symbols' })
    @IsOptional()
    description?: string;

}