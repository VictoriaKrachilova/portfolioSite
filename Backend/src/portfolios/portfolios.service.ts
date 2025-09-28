import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Portfolios } from './portfolios.model';
import { CreatePortfolioDto } from './dto/create-portfolio.dto.js';
import { Users } from '../users/users.model';
import { Images } from '../images/images.model';
import { Comments } from '../comments/comments.model';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { ImagesService } from '../images/images.service';

@Injectable()
export class PortfoliosService {
    constructor(
        @InjectModel(Portfolios) private portfoliosRepository: typeof Portfolios,
        private imagesService: ImagesService
    ) {}

    
    private async validatePortfolioName (name : string, userId : number) {
        name = name.trim();
        const exists = await this.portfoliosRepository.findOne({ where: { userId, name } });
        if (exists) throw new BadRequestException('Container name already exists');
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

    private async deletePortfolioSystem(portfolioId: number) {
        await this.imagesService.deleteAllImagesByPortfolioId(portfolioId);
        await this.portfoliosRepository.destroy({ where: { id: portfolioId } });
        return null;
    }

    async deletePortfolio(portfolioId: number, userId: number) {
        const portfolio = await this.portfoliosRepository.findOne({ where: { id: portfolioId, userId } });
        if (!portfolio) throw new NotFoundException('Portfolio not found');
        await this.deletePortfolioSystem(portfolioId);
        return null;
    }

    async deleteAllPortfolioByUserId(userId: number) {
        const portfolioArr = await this.portfoliosRepository.findAll({ where: { userId }, raw: true, nest: true });
        await Promise.all(portfolioArr.map(portfolio => this.deletePortfolioSystem(portfolio.id)));
        return null;
    }


    async getPortfolioById(portfolioId: number, userId: number) {
        const portfolio = (await this.portfoliosRepository.findOne({
            attributes: [ "id", "name", "description" ],
            include: [
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
        if (!portfolio) throw new NotFoundException('Portfolio not found');
        if (data.name) await this.validatePortfolioName(data.name, data.user.id);
        Object.assign(portfolio, data);
        await this.portfoliosRepository.update(portfolio, { where: { id: portfolio.id } });
        return { status: "ok" };
    }



}
