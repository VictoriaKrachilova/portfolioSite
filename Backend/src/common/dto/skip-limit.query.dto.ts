import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt } from "class-validator";


export class SkipLimitQueryDto {
    @ApiProperty({ example: 0, description: 'How many items you need to skip' })
    @Type(() => Number)
    @IsInt()
    skip!: number;
  
    @ApiProperty({ example: 20, description: 'Number of items per page (limit)' })
    @Type(() => Number)
    @IsInt()
    limit!: number;
}