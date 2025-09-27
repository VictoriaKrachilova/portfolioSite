import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { RequestWithUser } from '../common/types';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Controller('portfolios')
export class PortfoliosController {
	constructor(private readonly portfoliosService: PortfoliosService) {}

	@ApiOperation({ summary: 'Create new portfolio' })
	@ApiResponse({ status: 201, description: 'Portfolio successfully created' })
	@ApiResponse({ status: 400, description: 'Container name already exists' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Post()
	async createPortfolio(@Body() body: CreatePortfolioDto) {
		return this.portfoliosService.createPortfolio(body);
	}

	@ApiOperation({ summary: "Get my portfolio by id" })
	@ApiResponse({ status: 404, description: 'Portfolio not found' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get('/:portfolioId')
	async getPortfolioById(@Param('portfolioId') portfolioId: number, @Req() req: RequestWithUser) {
		return this.portfoliosService.getPortfolioById(portfolioId, req.userId);
	}

	@ApiOperation({ summary: "Delete my portfolio by id" })
	@ApiResponse({ status: 404, description: 'Portfolio not found' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Delete('/:portfolioId')
	async deletePortfolio(@Param('portfolioId') portfolioId: number, @Req() req: RequestWithUser) {
		return this.portfoliosService.deletePortfolio(portfolioId, req.userId);
	}

	@ApiOperation({ summary: "Update my portfolio by id" })
	@ApiResponse({ status: 404, description: 'Portfolio not found' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Patch('/:portfolioId')
	async updatePortfolio(@Param('portfolioId') portfolioId: number, @Body() body: UpdatePortfolioDto) {
		return this.portfoliosService.updatePortfolio(portfolioId, body);
	}

}
