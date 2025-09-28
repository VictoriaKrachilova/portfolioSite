import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Users } from '../users/users.model';


interface RefreshTokenCreationAttrs {
    token: string;
    userId: number;
    expiresAt: number;
};

@Table({ tableName: 'refresh_token', timestamps: false })
export class RefreshToken extends Model<RefreshToken, RefreshTokenCreationAttrs> {
    @Column({ type: DataType.STRING, allowNull: false, primaryKey: true })
    token!: string;

    @ForeignKey(() => Users)
    @Column({ type: DataType.BIGINT, allowNull: false })
    userId!: number;

    @Column({ type: DataType.BIGINT, allowNull: false, defaultValue: () => Date.now() })
    created!: number;

    @Column({ type: DataType.BIGINT, allowNull: false })
    expiresAt!: number;

    @BelongsTo(() => Users)
    user!: Users;
}
