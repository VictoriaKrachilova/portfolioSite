import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { NonAttribute } from "sequelize";
import { Portfolios } from "../portfolios/portfolios.model";
import { Comments } from "../comments/comments.model";


interface ImagesCreationAttrs {
    portfolioId: number;
    name: string;
    description: string;
};

@Table({ tableName: 'images', createdAt: false, updatedAt: false })
export class Images extends Model<Images, ImagesCreationAttrs> {

    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @Column({ type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @ForeignKey(() => Portfolios)
    @ApiProperty({ example: 12, description: 'portfolio ID' })
    @Column({ type: DataType.BIGINT, allowNull: false })
    portfolioId!: number;

    @ApiProperty({ example: 'Trip', description: 'image`s contain name' })
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    name!: string;

    @ApiProperty({ example: 'Length: 1m', description: 'image`s description' })
    @Column({ type: DataType.STRING, allowNull: false })
    description!: string;

    @ApiProperty({ example: 1671455275315, description: 'Created at' })
    @Column({ type: DataType.BIGINT, allowNull: false, defaultValue: () => Date.now() })
    created!: number;

    @BelongsTo(() => Portfolios, { onDelete: 'CASCADE' })
    portfolio!: NonAttribute<Portfolios>;

    @HasMany(() => Comments)
    comments?: Comment[]; 
}
