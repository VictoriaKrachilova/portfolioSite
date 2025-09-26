import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, Matches } from "class-validator";


export class CreateUserDto {

    @ApiProperty({ example: 'user@gmail.com', description: 'E-mail' })
    @IsString({ message: 'email must be string' })
    @IsEmail({}, { message: "Incorrect email" })
    readonly email!: string;

    @ApiProperty({ example: '12345678', description: 'Password' })
    @IsString()
    @Length(8, 16, { message: 'Not less than 8 and not more than 16' })
    readonly password!: string;

    @ApiProperty({ example: 'Jon Scot', description: 'name' })
    @IsString()
    readonly name!: string;

    @ApiProperty({ example: 'UA', description: 'country (alpha-2)' })
    @IsString()
    @Length(2, 2, { message: 'Country code must be exactly 2 characters' })
    @Matches(/^[A-Z]{2}$/, { message: 'Country code must contain only 2 uppercase letters (A-Z)' })
    readonly country!: string;

}
