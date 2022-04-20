import sequelize from '../services/Sequelize'
import { Model, DataTypes, Optional } from 'sequelize'
import {
    CollectionAttributes,
    CollectionRequiredAttributes,
} from '../Types/Collection'

export const Collection = sequelize.define<
    Model<CollectionAttributes, CollectionRequiredAttributes>
>(
    'Collection',
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        contract: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        type: {
            type: new DataTypes.STRING(32),
            allowNull: false,
        },
        name: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        owner: {
            type: new DataTypes.STRING(64),
            allowNull: true,
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
        tableName: 'collections',
        timestamps: true,
        underscored: true,
    }
)
