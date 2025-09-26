import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users) private usersRepository: typeof Users,
    ) {}
    
    async getUserByEmail (email : string) {
        const user = (await this.usersRepository.findOne({ where: { email } }))?.toJSON();
        return user;
    }

    async registration(dto: CreateUserDto) {
        const user = (await this.usersRepository.create(dto)).toJSON();
        return user;
    }

    async getProfile(userId: number) {
        const user = await this.usersRepository.findByPk(userId, {
            attributes: [ 'id', 'name', 'email', 'country', 'created' ],
        });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
    
    async deleteProfile(userId: number) {
        const deleted = await this.usersRepository.destroy({ where: { id: userId } });
        if (!deleted) throw new NotFoundException('User not found');
        return { status: 'ok' };
    }
}
