import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import bcrypt from 'bcryptjs'
import { LoginUserDto } from './dto/login-user.dto.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { UsersService } from '../users/users.service.js';
import { Users } from '../users/users.model.js';


@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
                private jwtService: JwtService) {}


    private async generateUserToken(user: Users) {
        const payload = { id: user.id, country: user.country, role: 'user' };
        return { token: this.jwtService.sign(payload) };
    }

    async registration(dto: CreateUserDto) {
        const exists = await this.usersService.getUserByEmail(dto.email);
        if (exists) throw new UnauthorizedException({ message: 'User with this email exists' });
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.usersService.registration({ ...dto, password: hashPassword});
        return this.generateUserToken(user);
    }

    private async validateUser(userDto: LoginUserDto) {
        let user = await this.usersService.getUserByEmail(userDto.email);
        if (user && user.password) {
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if (passwordEquals) return user;
        }
        throw new UnauthorizedException({ message: 'Incorrect email or password' });
    }

    async login(userDto: LoginUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateUserToken(user);
    }
    
}