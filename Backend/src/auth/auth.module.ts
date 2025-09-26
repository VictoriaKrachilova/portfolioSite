import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from '../users/users.module.js';
@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		forwardRef(() => UsersModule),
		JwtModule.register({
			secret: process.env.PRIVATE_KEY || 'SECRET',
			signOptions: {
				expiresIn: '24h'
			}
		})
	],
	exports: [
		AuthService,
		JwtModule
	]
})
export class AuthModule { }