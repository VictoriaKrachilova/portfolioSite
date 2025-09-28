import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { AuthService } from '../auth/auth.service';
import { PortfoliosService } from '../portfolios/portfolios.service';
import { TokenService } from '../auth/token.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users) private usersRepository: typeof Users,
        private portfoliosService: PortfoliosService,
        private tokenService: TokenService
    ) {}
    
    async getUserByIdSystem (userId : number) {
        return (await this.usersRepository.findByPk(userId))?.toJSON();
    }

    async getUserByEmail (email : string) {
        const user = (await this.usersRepository.findOne({ where: { email } }))?.toJSON();
        return user;
    }

    async registration(dto: CreateUserDto) {
        return (await this.usersRepository.create(dto)).toJSON();
    }

    async getProfile(userId: number) {
        const user = (await this.usersRepository.findByPk(userId, {
            attributes: [ 'id', 'name', 'email', 'country', 'created' ],
        }))?.toJSON();
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
    
    async deleteProfile(userId: number) {
        const user = (await this.usersRepository.findByPk(userId))?.toJSON();
        if (!user) throw new NotFoundException('User not found');
        await this.portfoliosService.deleteAllPortfolioByUserId(userId);
        await this.usersRepository.destroy({ where: { id: userId } });
        await this.tokenService.removeAllRefreshTokenByUserId(userId);
        return null;
    }
    
}
