import { ApiProperty } from "@nestjs/swagger";
import { Request } from 'express';
import { Comments } from "../../comments/comments.model";

export interface RequestWithUser extends Request {
    userId: number;
}

export class user {
    id!: number;
    role!: 'user';
};


export class ImageFeedDto {
    @ApiProperty({ example: 1, description: 'Image ID' })
    id!: number;

    @ApiProperty({ example: 'Trip photo', description: 'Image name' })
    name!: string;

    @ApiProperty({ example: 'Length: 1m', description: 'Image description', required: false })
    description?: string;

    @ApiProperty({ example: 'Trip Portfolio', description: 'Portfolio name' })
    portfolioName!: string;

    @ApiProperty({ example: 1671455275315, description: 'Creation timestamp' })
    created!: number;

    @ApiProperty({ example: '/files/abc.jpg', description: 'URL to image file' })
    fileUrl!: string;
}

export class ImageFeedResponseDto {
    @ApiProperty({ type: [ImageFeedDto], description: 'Array of images' })
    images!: ImageFeedDto[];

    @ApiProperty({ example: 100, description: 'Total number of images in DB' })
    count!: number;
}

export class IdResponseDto {
    @ApiProperty({ example: 1, description: 'ID' })
    id!: number;
}

export class AuthResponseDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.3MDg4NywiZXhwIjoxNzU5MTU3Mjg3fQ.dVxlA2Xfz5wdhLiF4Bqutv8jSHA84WaKGXY-CxW6t3c', description: 'Bearer access token' })
    accessToken!: string;

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.3MDg4NywiZXhwIjoxNzU5MTU3Mjg3fQ.dVxlA2Xfz5wdhLiF4Bqutv8jSHA84WaKGXY-CxW6t3c', description: 'Bearer refresh token' })
    refreshToken!: string;
}

export class GetCommentsResponseDto {
    @ApiProperty({ type: [Comments], description: 'Array of comments' })
    comments!: Comments[];

    @ApiProperty({ example: 100, description: 'Total number of comments' })
    count!: number;
}

export class UserProfileDto {
    @ApiProperty({ example: 1, description: 'Unique identifier' })
    id!: number;

    @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
    email!: string;

    @ApiProperty({ example: 'Jon', description: 'User name' })
    name!: string;

    @ApiProperty({ example: 'UA', description: 'Country code' })
    country!: string;

    @ApiProperty({ example: 1671455275315, description: 'Creation timestamp' })
    created!: number;
}