import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";


export class SkipLimitQueryDto {
    @ApiProperty({ example: 1, description: 'How many items you need to skip', required: true })
    @Type(() => Number)
    @IsInt()
    skip!: number;
  
    @ApiProperty({ example: 20, description: 'Number of items per page (limit)', required: true })
    @Type(() => Number)
    @IsInt()
    limit!: number;
}