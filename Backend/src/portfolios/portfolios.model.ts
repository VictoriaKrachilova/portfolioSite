import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Users } from "../users/users.model";
import { NonAttribute } from "sequelize";
import { Images } from "../images/images.model";


interface PortfoliosCreationAttrs {
    userId: number;
    name: string;
    description: string;
};

@Table({ tableName: 'portfolios', timestamps: false })
export class Portfolios extends Model<Portfolios, PortfoliosCreationAttrs> {

    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @Column({ type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @ForeignKey(() => Users)
    @ApiProperty({ example: 1, description: 'user ID' })
    @Column({ type: DataType.BIGINT, allowNull: false })
    userId!: number;

    @ApiProperty({ example: 'Trip', description: 'portfolio`s contain name' })
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    name!: string;

    @ApiProperty({ example: 'It was a wonderful day. The sky was covered with clouds.', description: 'portfolio`s description' })
    @Column({ type: DataType.STRING, allowNull: false })
    description!: string;

    @ApiProperty({ example: 1671455275315, description: 'Created at' })
    @Column({ type: DataType.BIGINT, allowNull: false, defaultValue: () => Date.now() })
    created!: number;

    @BelongsTo(() => Users, { onDelete: 'CASCADE' })
    user!: NonAttribute<Users>;

    @HasMany(() => Images)
    images?: Images[]; 
}
