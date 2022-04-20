import { Optional } from 'sequelize/types'

export interface ItemAttributes {
    readonly id: number
    collection_id: number
    token_id: number
    meta_name?: string
    meta_description?: string
    meta_image?: string
}

export type ItemRequiredAttributes = Optional<ItemAttributes, 'id'>
