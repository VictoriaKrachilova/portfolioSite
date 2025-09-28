import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users.model';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private tokenService: TokenService,
    ) { }

    private generateAccessToken(user: Users) {
        const payload = { id: user.id, role: 'user' };
        return this.jwtService.sign(payload, { expiresIn: '15m' });
    }

    private generateRefreshToken(user: Users) {
        const payload = { id: user.id };
        const token = this.jwtService.sign(payload, { expiresIn: '7d' });
        return token;
    }

    async registration(dto: CreateUserDto) {
        const exists = await this.usersService.getUserByEmail(dto.email);
        if (exists) throw new ConflictException({ message: 'User with this email exists' });
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.usersService.registration({ ...dto, password: hashPassword});

        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);
        await this.tokenService.saveRefreshToken(user.id, refreshToken);


        return { accessToken, refreshToken };
    }


    async login(dto : LoginUserDto) {
        const user = await this.validateUser(dto);
        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);
        await this.tokenService.saveRefreshToken(user.id, refreshToken);

        return { accessToken, refreshToken };
    }

    private async validateUser(dto: LoginUserDto) {
        const user = await this.usersService.getUserByEmail(dto.email);
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Incorrect email or password');
        }
        return user;
    }

    async logout(userId: number, token?: string) {

        return this.tokenService.removeRefreshTokenByUserId(userId, token);
    }

    async refreshTokens(oldRefreshToken: string) {
        const tokenRecord = await this.tokenService.getRefreshTokenRecord(oldRefreshToken);
        if (!tokenRecord || tokenRecord.expiresAt < Date.now()) {
            throw new UnauthorizedException('Refresh token expired');
        }

        const user = await this.usersService.getUserByIdSystem(tokenRecord.userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        const newAccessToken = this.generateAccessToken(user);
        const newRefreshToken = this.generateRefreshToken(user);
        await this.tokenService.removeRefreshToken(oldRefreshToken);
        await this.tokenService.saveRefreshToken(user.id, newRefreshToken);

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
}
