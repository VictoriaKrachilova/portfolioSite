import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";


export class CreateCommentDto {

    @ApiProperty({ example: 1, description: 'image id' })
    @IsNumber()
    imageId!: number;

    @ApiProperty({ example: 'Great', description: 'text of comment' })
    @IsString()
    @Length(1, 250, { message: 'Not more than 250 symbols' })
    text!: string;

}