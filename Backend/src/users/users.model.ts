import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Portfolios } from "../portfolios/portfolios.model";


interface UsersCreationAttrs {
    email: string;
    password: string;
    name: string;
    country: string;
};

@Table({ tableName: 'users', createdAt: false, updatedAt: false })
export class Users extends Model<Users, UsersCreationAttrs> {

    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @Column({ type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @ApiProperty({ example: 'user@gmail.com', description: 'E-mail' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email!: string;

    @ApiProperty({ example: '12345678', description: 'Password' })
    @Column({ type: DataType.STRING, allowNull: false })
    password!: string;

    @ApiProperty({ example: 'Jon', description: 'name' })
    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @ApiProperty({ example: 'UA', description: 'country (alpha-2)' })
    @Column({ type: DataType.STRING, allowNull: false })
    country!: string;

    @ApiProperty({ example: 1671455275315, description: 'Created at' })
    @Column({ type: DataType.BIGINT, allowNull: false, defaultValue: () => Date.now() })
    created!: number;

    @HasMany(() => Portfolios)
    portfolios?: Portfolios[];  
}
