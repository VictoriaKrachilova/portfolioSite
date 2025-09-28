import { Body, Controller, Delete, Get, Param, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { IdResponseDto, ImageFeedResponseDto, RequestWithUser } from '../common/dto/types';
import { Request, Response} from 'express';
import { CreateImageDto } from './dto/create-image.dto';
import multer from 'multer';
import { SkipLimitQueryDto } from '../common/dto/skip-limit.query.dto';


@Controller('images')
export class ImagesController {
	constructor(private readonly imagesService: ImagesService) { }

	@Get()
	@ApiOperation({ summary: 'Get images ordered by creation time' })
	@ApiResponse({ status: 201, type: ImageFeedResponseDto, description: 'list of images and count' })
	async getImages(@Query() query: SkipLimitQueryDto) {
		return this.imagesService.getImages(query.limit, query.skip);
	}

	@ApiOperation({ summary: 'Upload image to portfolio' })
	@UseInterceptors(
		FileInterceptor('file', {
			storage: multer.memoryStorage(), // file.buffer
		}),
	)
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
				},
				portfolioId: { type: 'number', example: 1 },
				name: { type: 'string', example: 'My Image' },
				description: { type: 'string', example: 'Portfolio image description' },
			},
			required: ['file', 'name', 'portfolioId'],
		},
	})
	@ApiResponse({ status: 201, type: IdResponseDto, description: 'Image uploaded successfully' })
	@ApiResponse({ status: 404, description: 'Portfolio not found' })
	@ApiResponse({ status: 400, description: 'Container name already exists' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Post()
	async uploadImage(
		@UploadedFile() file: Express.Multer.File,
		@Body() body: CreateImageDto,
		@Req() req: RequestWithUser
	) {
		return this.imagesService.uploadImage(body, file, req.userId);
	}

	@ApiOperation({ summary: 'Get portfolio`s image',})
    @ApiResponse({ status: 200, description: 'Image file' })
    @ApiResponse({ status: 404, description: 'Image not found' })
    @Get('/:imageId')
    async getCourierDocument(@Param('imageId') imageId: number, @Res() res: Response) {
        const file = await this.imagesService.getImage(imageId);
        file.pipe(res);
    }

	@ApiOperation({ summary: 'Delete image' })
	@ApiResponse({ status: 200, description: 'OK' })
	@ApiResponse({ status: 404, description: 'Image not found' })
	@ApiResponse({ status: 404, description: 'Portfolio not found' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Delete('/:imageId')
	async deleteImage(@Param('imageId') imageId: number, @Req() req: RequestWithUser) {
		return this.imagesService.deleteImage(imageId, req.userId);
	}

}
