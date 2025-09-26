import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Portfolios } from './portfolios.model';

@Module({
	controllers: [PortfoliosController],
	providers: [PortfoliosService],
	imports: [
		AuthModule,
		SequelizeModule.forFeature([ Portfolios ]),
	]
})
export class PortfoliosModule {}
