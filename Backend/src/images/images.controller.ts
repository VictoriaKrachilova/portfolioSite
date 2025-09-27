import { Body, Controller, Delete, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiNotFoundResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestWithUser } from '../common/types';
import { Request, Response} from 'express';
import { CreateImageDto } from './dto/create-image.dto';


@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

	@ApiOperation({ summary: 'Add portfolio`s image' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@ApiResponse({ status: 201 })
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@ApiNotFoundResponse({ description: 'Portfolio not found' })
	@ApiResponse({ status: 400, description: 'Container name already exists' })
	@Post()
	@UseInterceptors(FileInterceptor('file'))
	async uploadImage(
		// @Param('portfolioId') portfolioId: number,
		@UploadedFile() file: Express.Multer.File,
		@Body() body: CreateImageDto 
	) {
		return this.imagesService.uploadImage(body, file);
	}

	@ApiOperation({ summary: 'Get portfolio`s image',})
    @ApiResponse({ status: 201 })
    @ApiNotFoundResponse({ description: 'Image not found' })
    @Get('/:imageId')
    async getCourierDocument(@Param('imageId') imageId: number, @Res() res: Response) {
        const file = await this.imagesService.getImage(imageId);
        file.pipe(res);
    }

	@ApiOperation({ summary: 'Delete image' })
	@ApiNotFoundResponse({ description: 'Image not found' })
	@ApiNotFoundResponse({ description: 'Portfolio not found' })
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Delete('/:imageId')
	async deleteImage(@Param('imageId') imageId: number, @Req() req: RequestWithUser) {
		return this.imagesService.deleteImage(imageId, req.userId);
	}

}
