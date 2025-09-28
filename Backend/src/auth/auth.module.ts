import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from '../users/users.module.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken } from './refresh-token.model.js';
import { TokenService } from './token.service.js';

@Module({
	controllers: [AuthController],
	providers: [TokenService, AuthService],
	imports: [
		forwardRef(() => UsersModule),
		JwtModule.register({
			secret: process.env.PRIVATE_KEY || 'SECRET',
		}),
		SequelizeModule.forFeature([ RefreshToken ]),
	],
	exports: [ TokenService, JwtModule ]
})
export class AuthModule { }