import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Images } from './images.model';
import { Portfolios } from '../portfolios/portfolios.model';
import { StorageModule } from '../storage/storage.module';

@Module({
	controllers: [ImagesController],
	providers: [ImagesService],
	imports: [
		SequelizeModule.forFeature([ Images, Portfolios ]),
		StorageModule
	]
})
export class ImagesModule {}
