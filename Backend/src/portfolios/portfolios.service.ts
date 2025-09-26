import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Portfolios } from './portfolios.model';
import { CreatePortfolioDto } from './dto/create-portfolio.dto.js';
import { Users } from '../users/users.model';
import { Images } from '../images/images.model';
import { Comments } from '../comments/comments.model';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Injectable()
export class PortfoliosService {
    constructor(
        @InjectModel(Portfolios) private portfoliosRepository: typeof Portfolios,
    ) {}

    
    private async validatePortfolioName (name : string, userId : number) {
        name = name.trim();
        const exists = await this.portfoliosRepository.findOne({ where: { userId, name } });
        if (exists) {
            throw new BadRequestException('Container name already exists');
        }
        return null;
    }

    async createPortfolio (data: CreatePortfolioDto) {
        await this.validatePortfolioName(data.name, data.user.id);
        const portfolio = (await this.portfoliosRepository.create( {
            name: data.name,
            description: data.description,
            userId: data.user.id
        })).toJSON();
        return { id: portfolio.id };
    }

    async deletePortfolio(portfolioId: number, userId: number) {
        const deleted = await this.portfoliosRepository.destroy({ where: { id: portfolioId, userId } });
        if (!deleted) throw new NotFoundException('Portfolio not found');
        return { status: 'ok' };
    }

    async getPortfolioById(portfolioId: number, userId: number) {
        const portfolio = (await this.portfoliosRepository.findOne({
            attributes: [ "id", "name", "description" ],
            include: [
                {
                    model: Users,
                    attributes: [ "id", "name" ],
                    required: true
                },
                {
                    model: Images,
                    attributes: [ "id", "name", "description" ],
                    required: false,
                    include: [
                        { 
                            model: Comments,
                            attributes: [ "id", "text" ],
                            required: false
                        }
                    ]
                }

            ],
            where: { id: portfolioId, userId }
        }))?.toJSON();
        if (!portfolio) throw new NotFoundException('Portfolio not found');
        return portfolio;
    }

    async updatePortfolio(portfolioId: number, data: UpdatePortfolioDto) {
        const portfolio = (await this.portfoliosRepository.findOne({ where: { id: portfolioId, userId: data.user.id } }))?.toJSON();
        if (!portfolio) throw new HttpException('Portfolio not found', HttpStatus.NOT_FOUND);
        if (data.name) await this.validatePortfolioName(data.name, data.user.id);
        Object.assign(portfolio, data);
        await this.portfoliosRepository.update(portfolio, { where: { id: portfolio.id } });
        return { status: "ok" };
    }



}
