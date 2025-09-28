import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBadRequestResponse, ApiNotFoundResponse, ApiUnauthorizedResponse, ApiConflictResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service.js";
import { LoginUserDto } from './dto/login-user.dto.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { AuthResponseDto, RequestWithUser } from '../common/dto/types.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/registration')
    @ApiOperation({ summary: 'User registration' })
    @ApiBadRequestResponse({ description: 'Invalid input data' })
    @ApiConflictResponse({ description: 'User with this email already exists' })
    @ApiResponse({ status: 201, type: AuthResponseDto, description: 'Registration successful' })
    registration(@Body() dto: CreateUserDto) {
        return this.authService.registration(dto)
    }

    @Post('/login')
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, type: AuthResponseDto })
    @ApiBadRequestResponse({ description: 'Invalid input data' })
    @ApiUnauthorizedResponse({ description: 'Incorrect email or password' })
    login(@Body() dto: LoginUserDto) {
        return this.authService.login(dto)
    }

    @Post('/logout')
    @ApiOperation({ summary: 'User logout (revoke refresh token)' })
    @ApiResponse({ status: 200, description: 'Successfully logged out' })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    logout(@Req() req: RequestWithUser) {
        const token = req.headers.authorization?.replace('Bearer ', '');
        return this.authService.logout(req.userId, token);
    }

    @Post('/refresh')
    @ApiOperation({ summary: 'Refresh access and refresh tokens' })
    @ApiResponse({ status: 200, type: AuthResponseDto, description: 'New access and refresh tokens' })
    @ApiUnauthorizedResponse({ description: 'Refresh token expired or invalid' })
    refresh(@Body('refreshToken') refreshToken: string) {
        return this.authService.refreshTokens(refreshToken);
    }


}