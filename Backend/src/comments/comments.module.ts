import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comments } from './comments.model';
import { Images } from '../images/images.model';

@Module({
	controllers: [CommentsController],
	providers: [CommentsService],
	imports: [ 
		SequelizeModule.forFeature([ Images, Comments ]),
	],
	exports: [ CommentsService ]
})
export class CommentsModule {}
