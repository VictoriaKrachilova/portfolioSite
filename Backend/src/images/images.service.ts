import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, literal, col, fn, where, QueryTypes } from "sequelize";
import { Transaction as SequelizeTransaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Images } from './images.model';
import { Portfolios } from '../portfolios/portfolios.model';
import { CreateImageDto } from './dto/create-image.dto';
import { StorageService } from '../storage/storage.service';
import { Readable } from 'stream';

@Injectable()
export class ImagesService {
    constructor(
        @InjectModel(Images) private imagesRepository: typeof Images,
        @InjectModel(Portfolios) private portfoliosRepository: typeof Portfolios,
        private storageService: StorageService,
        private readonly sequelize: Sequelize
    ) {}

    


    async uploadImage (data: CreateImageDto, file: Express.Multer.File, userId: number) {
        data.name = data.name.trim();
        const portfolio = await this.portfoliosRepository.findOne({ where: { id: data.portfolioId, userId } });
        if (!portfolio) throw new NotFoundException('Portfolio not found');
        const exists = await this.imagesRepository.findOne({ where: { name: data.name, portfolioId: portfolio.id } });
        if (exists) throw new BadRequestException('Container name already exists');
        const transaction: SequelizeTransaction = await this.sequelize.transaction();
        try {
            const image = (await this.imagesRepository.create(data, { transaction })).toJSON();
            await this.storageService.saveFile(`portfolio-${data.portfolioId}`, `image-${image.id}.jpeg`, file.buffer.toString('base64') );
            await transaction.commit();
            return { id: image.id };
        } catch (err) {
            if (transaction) await transaction.rollback();
            throw err;
        }
    }

    async deleteImage(imageId: number, userId: number) {
        const image = (await this.imagesRepository.findByPk(imageId))?.toJSON();
        if (!image) throw new NotFoundException('Image not found');
        const portfolio = await this.portfoliosRepository.findOne({ where: { id: image.portfolioId, userId } });
        if (!portfolio) throw new NotFoundException('Portfolio not found');
        await this.storageService.deleteFile(`portfolio-${portfolio.id}`, `image-${image.id}.jpeg`);
        await this.imagesRepository.destroy({ where: { id: imageId } });
        return { status: 'ok' };
    }

    async getImage(imageId: number) {
        const image = (await this.imagesRepository.findByPk(imageId))?.toJSON();
        if (!image) throw new NotFoundException('Image not found');
        const buffer = await this.storageService.getFile(`portfolio-${image.portfolioId}`, `image-${image.id}.jpeg`);
        return Readable.from(buffer);
    };

    async deleteAllImagesByPortfolioId(portfolioId: number) {
        await this.storageService.clearContainer(`portfolio-${portfolioId}`);
        await this.imagesRepository.destroy({ where: { portfolioId } });
        return { status: 'ok' };
    }
}
