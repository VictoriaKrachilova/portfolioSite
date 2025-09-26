import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBadRequestResponse, ApiNotFoundResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service.js";
import { LoginUserDto } from './dto/login-user.dto.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}
    
    @ApiOperation({ summary: 'User login' })
    @Post('/login')
    login(@Body() dto: LoginUserDto) {
        return this.authService.login(dto)
    }

    @ApiOperation({ summary: 'User registration' })
    @ApiUnauthorizedResponse({description: 'Unauthorized. Example: { "message": "User with this email exists" }'})
    @Post('/registration')
    registration(@Body() dto: CreateUserDto) {
        return this.authService.registration(dto)
    }

}