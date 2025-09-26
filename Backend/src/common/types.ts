import { ApiProperty } from "@nestjs/swagger";
import { Request } from 'express';

export interface RequestWithUser extends Request {
    userId: number;
}

export class user {
    id!: number;
    country!: string;
    role!: 'user';
};