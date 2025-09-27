import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { NonAttribute } from "sequelize";
import { Portfolios } from "../portfolios/portfolios.model";
import { Images } from "../images/images.model";


interface CommentsCreationAttrs {
    imageId: number;
    text: string;
};

@Table({ tableName: 'comments', createdAt: false, updatedAt: false })
export class Comments extends Model<Comments, CommentsCreationAttrs> {

    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @Column({ type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true })
    declare id: number;

    @ForeignKey(() => Images)
    @ApiProperty({ example: 12, description: 'image ID' })
    @Column({ type: DataType.BIGINT, allowNull: false })
    imageId!: number;

    @ApiProperty({ example: 'Amazing!', description: 'comment text' })
    @Column({ type: DataType.TEXT, allowNull: false })
    text!: string;

    @ApiProperty({ example: 1671455275315, description: 'Created at' })
    @Column({ type: DataType.BIGINT, allowNull: false, defaultValue: () => Date.now() })
    created!: number;

    @BelongsTo(() => Images, { onDelete: 'CASCADE' })
    image!: NonAttribute<Images>;
}
