import { Body, Controller, Delete, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiNotFoundResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestWithUser } from '../common/types';
import { Request, Response} from 'express';
import { CreateImageDto } from './dto/create-image.dto';
import multer from 'multer';


@Controller('images')
export class ImagesController {
	constructor(private readonly imagesService: ImagesService) { }

	// @ApiOperation({ summary: 'Add portfolio`s image' })
	// @ApiConsumes('multipart/form-data')
	// @ApiBody({
	// 	schema: {
	// 		type: 'object',
	// 		properties: {
	// 			file: {
	// 				type: 'string',
	// 				format: 'binary',
	// 			},
	// 			portfolioId: { type: 'number', example: 1 },
	// 			name: { type: 'string', example: 'My Image' },
	// 			description: { type: 'string', example: 'Portfolio image description' },
	// 		},
	// 		required: ['file', 'name', 'portfolioId' ],
	// 	},
	// })
	// @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
	// @ApiBearerAuth()
	// @UseGuards(JwtAuthGuard)
	// @ApiNotFoundResponse({ description: 'Portfolio not found' })
	// @ApiResponse({ status: 400, description: 'Container name already exists' })
	// @Post()
	// @UseInterceptors(FileInterceptor('file'))
	// async uploadImage(
	// 	@UploadedFile() file: Express.Multer.File,
	// 	@Body() body: CreateImageDto
	// ) {
	// 	return this.imagesService.uploadImage(body, file);
	// }


	@ApiOperation({ summary: 'Upload image to portfolio' })
	@UseInterceptors(
		FileInterceptor('file', {
			storage: multer.memoryStorage(), // чтобы был file.buffer
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
	@ApiResponse({ status: 201, description: 'Image uploaded successfully' })
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@ApiNotFoundResponse({ description: 'Portfolio not found' })
	@ApiResponse({ status: 400, description: 'Container name already exists' })
	@Post()
	async uploadImage(
		@UploadedFile() file: Express.Multer.File,
		@Body() body: CreateImageDto,
		@Req() req: RequestWithUser
	) {
		console.log(file)
		return this.imagesService.uploadImage(body, file, req.userId);
	}



	// @ApiOperation({ summary: 'Add portfolio`s image' })
	// @UseInterceptors(FileInterceptor('file'))
	// @ApiOperation({ summary: 'Upload image to portfolio with metadata' })
	// @ApiConsumes('multipart/form-data')
	// @ApiBody({
	// 	description: 'Image file and metadata',
	// 	type: CreateImageDto,
	// })
	// @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
	// @ApiBearerAuth()
	// @UseGuards(JwtAuthGuard)
	// @ApiNotFoundResponse({ description: 'Portfolio not found' })
	// @ApiResponse({ status: 400, description: 'Container name already exists' })
	// @Post()
	// @UseInterceptors(FileInterceptor('file'))
	// async uploadImage(
	// 	@UploadedFile() file: Express.Multer.File,
	// 	@Body() body: CreateImageDto
	// ) {
	// 	return this.imagesService.uploadImage(body, file);
	// }


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
