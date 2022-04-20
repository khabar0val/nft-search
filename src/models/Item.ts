import sequelize from '../services/Sequelize'
import { Model, DataTypes, Optional } from 'sequelize'
import { ItemAttributes, ItemRequiredAttributes } from '../Types/Item'

export const Item = sequelize.define<
    Model<ItemAttributes, ItemRequiredAttributes>
>(
    'Item',
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        collection_id: {
            type: new DataTypes.BIGINT(),
            allowNull: false,
        },
        token_id: {
            type: new DataTypes.BIGINT(),
            allowNull: false,
        },
        meta_name: {
            type: new DataTypes.STRING(255),
            allowNull: true,
        },
        meta_description: {
            type: new DataTypes.TEXT(),
            allowNull: true,
        },
        meta_image: {
            type: new DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        tableName: 'items',
        timestamps: true,
        underscored: true,
    }
)
