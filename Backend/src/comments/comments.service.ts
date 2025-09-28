import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Images } from '../images/images.model';
import { Comments } from './comments.model';

@Injectable()
export class CommentsService {
	constructor(
		@InjectModel(Images) private imagesRepository: typeof Images,
		@InjectModel(Comments) private commentsRepository: typeof Comments,
	) { }

	async createComment(data: CreateCommentDto) {
		const image = await this.imagesRepository.findByPk(data.imageId);
		if (!image) throw new NotFoundException('Image not found');
		const comment = (await this.commentsRepository.create(data)).toJSON();
		return { id: comment.id };
	}

	async getCommentsByImageId(imageId: number, offset: number, limit: number) {
		const comments = await this.commentsRepository.findAll({
			where: { imageId },
			order: [ [ "created", "DESC" ] ],
			offset,
			limit,
			raw: true
		});
		const count = await this.commentsRepository.count({ where: { imageId }});
		return { comments, count };
	}
}
