import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SkipLimitQueryDto } from 'src/common/skip-limit.query.dto';

@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) { }

	@ApiOperation({ summary: 'Add new comment' })
	@ApiResponse({ status: 201, description: 'Comment successfully created' })
	@ApiResponse({ status: 404, description: 'Image not found' })
	@Post()
	async createComment(@Body() body: CreateCommentDto) {
		return this.commentsService.createComment(body);
	}

	@ApiOperation({ summary: "Get comments by image id" })
	@ApiResponse({ status: 404, description: 'Image not found' })
	@Get('/:imageId')
	async getCommentsByImageId(
		@Param('imageId') imageId: number,
		@Query() query: SkipLimitQueryDto
	) {
		return this.commentsService.getCommentsByImageId(imageId, query.skip, query.limit);
	}
}
