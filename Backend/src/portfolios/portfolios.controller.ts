import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { IdResponseDto, RequestWithUser } from '../common/dto/types';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolios } from './portfolios.model';

@Controller('portfolios')
export class PortfoliosController {
	constructor(private readonly portfoliosService: PortfoliosService) {}

	@Post()
	@ApiOperation({ summary: 'Create new portfolio' })
	@ApiResponse({ status: 201, type: IdResponseDto, description: 'Portfolio successfully created' })
	@ApiResponse({ status: 401, description: 'User not authorized' })
	@ApiResponse({ status: 400, description: 'Container name already exists' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async createPortfolio(@Body() body: CreatePortfolioDto) {
		return this.portfoliosService.createPortfolio(body);
	}

	@Get('/:portfolioId')
	@ApiOperation({ summary: "Get my portfolio by id" })
	@ApiResponse({ status: 200, description: 'my portfolio' })
	@ApiResponse({ status: 401, description: 'User not authorized' })
	@ApiResponse({ status: 404, description: 'Portfolio not found' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async getPortfolioById(@Param('portfolioId') portfolioId: number, @Req() req: RequestWithUser) {
		return this.portfoliosService.getPortfolioById(portfolioId, req.userId);
	}

	@Delete('/:portfolioId')
	@ApiOperation({ summary: "Delete my portfolio by id" })
	@ApiResponse({ status: 200, description: 'Portfolio successfully deleted' })
	@ApiResponse({ status: 401, description: 'User not authorized' })
	@ApiResponse({ status: 404, description: 'Portfolio not found' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async deletePortfolio(@Param('portfolioId') portfolioId: number, @Req() req: RequestWithUser) {
		return this.portfoliosService.deletePortfolio(portfolioId, req.userId);
	}

	
	@Patch('/:portfolioId')
	@ApiOperation({ summary: "Update my portfolio by id" })
	@ApiResponse({ status: 200, description: 'Portfolio successfully updated' })
	@ApiResponse({ status: 400, description: 'Container name already exists' })
	@ApiResponse({ status: 401, description: 'User not authorized' })
	@ApiResponse({ status: 404, description: 'Portfolio not found' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async updatePortfolio(@Param('portfolioId') portfolioId: number, @Body() body: UpdatePortfolioDto) {
		return this.portfoliosService.updatePortfolio(portfolioId, body);
	}

}
