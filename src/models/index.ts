import sequelize from '../services/Sequelize'

import { Item } from './Item'
import { Collection } from './Collection'

Collection.hasMany(Item, { foreignKey: 'collection_id' })
Item.belongsTo(Collection, { foreignKey: 'collection_id' })

const _init = async () => {
    await sequelize.sync({
        alter: true,
        force: false,
    })
}

export default _init
