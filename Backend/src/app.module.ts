import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImagesModule } from './images/images.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { UsersModule } from './users/users.module';
import { Users } from './users/users.model';
import { Portfolios } from './portfolios/portfolios.model';
import { Images } from './images/images.model';
import { Comments } from './comments/comments.model';
import { StorageModule } from './storage/storage.module';
import { CommentsModule } from './comments/comments.module';

@Module({
	controllers: [],
	providers: [],
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.development.env'
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			autoLoadModels: true,
			models: [ 
				Comments,
				Images,
				Portfolios,
				Users,
			]
		}),
		UsersModule,
		PortfoliosModule,
		ImagesModule,
		StorageModule,
		CommentsModule,
	],
})
export class AppModule {}
