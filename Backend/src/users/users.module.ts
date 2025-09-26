import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users.model';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [
		forwardRef(() => AuthModule),
        SequelizeModule.forFeature([ Users ]),
	],
	exports: [UsersService]
})
export class UsersModule { }
