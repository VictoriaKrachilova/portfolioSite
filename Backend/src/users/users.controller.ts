import { Controller, Delete, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RequestWithUser } from '../common/types';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@ApiOperation({ summary: "Get user's profile" })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@ApiResponse({ status: 404, description: 'User not found' })
	@Get('profile')
	async getProfile(@Req() req: RequestWithUser) {
		return this.usersService.getProfile(req.userId);
	}

	@ApiOperation({ summary: "Delete user's profile" })
	@ApiResponse({ status: 404, description: 'User not found' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Delete('profile')
	async deleteProfile(@Req() req: RequestWithUser) {
		return this.usersService.deleteProfile(req.userId);
	}
}
