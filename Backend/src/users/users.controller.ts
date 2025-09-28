import { Controller, Delete, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RequestWithUser, UserProfileDto } from '../common/dto/types';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Get('profile')
	@ApiOperation({ summary: "Get user's profile" })
	@ApiResponse({ status: 200, type: UserProfileDto, description: 'User profile data' })
	@ApiResponse({ status: 404, description: 'User not found' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async getProfile(@Req() req: RequestWithUser) {
		return this.usersService.getProfile(req.userId);
	}

	@Delete('profile')
	@ApiOperation({ summary: "Delete user's profile" })
	@ApiResponse({ status: 200, description: 'Profile successfully deleted' })
	@ApiResponse({ status: 404, description: 'User not found' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async deleteProfile(@Req() req: RequestWithUser) {
		return this.usersService.deleteProfile(req.userId);
	}
}
