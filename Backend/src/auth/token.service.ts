import { Injectable} from '@nestjs/common';
import { RefreshToken } from './refresh-token.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TokenService {
    constructor(
        @InjectModel(RefreshToken) private readonly refreshTokenRepository: typeof RefreshToken,
    ) { }

    async saveRefreshToken(userId: number, token: string) {
        const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
        await this.refreshTokenRepository.create({ userId, token, expiresAt });
    }
    
    async removeRefreshTokenByUserId(userId: number, token?: string) {
        if (!token) return null;
        await this.refreshTokenRepository.destroy({ where: { userId, token } });
        return null;
    }

    async removeAllRefreshTokenByUserId(userId: number) {
        await this.refreshTokenRepository.destroy({ where: { userId } });
        return null;
    }

    async removeRefreshToken(token: string) {
        await this.refreshTokenRepository.destroy({ where: { token } });
        return null;
    }

    async getRefreshTokenRecord(token: string) {
        const tokenRecord = await this.refreshTokenRepository.findOne({ where: { token } });
        return tokenRecord;
    }

   
}
