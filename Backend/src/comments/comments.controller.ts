import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SkipLimitQueryDto } from '../common/dto/skip-limit.query.dto';
import { GetCommentsResponseDto, IdResponseDto } from '../common/dto/types';

@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) { }

	@Post()
	@ApiOperation({ summary: 'Add new comment' })
	@ApiResponse({ status: 404, description: 'Image not found' })
	@ApiResponse({ status: 201, type: IdResponseDto, description: 'Comment successfully created' })
	async createComment(@Body() body: CreateCommentDto) {
		return this.commentsService.createComment(body);
	}

	@Get('/:imageId')
	@ApiOperation({ summary: "Get comments by image id" })
	@ApiResponse({ status: 200, type: GetCommentsResponseDto, description: 'list of comments and count' })
	@ApiResponse({ status: 404, description: 'Image not found' })
	async getCommentsByImageId(@Param('imageId') imageId: number, @Query() query: SkipLimitQueryDto) {
		return this.commentsService.getCommentsByImageId(imageId, query.skip, query.limit);
	}
}
