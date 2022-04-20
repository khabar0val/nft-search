import { Optional } from 'sequelize/types'

export interface CollectionAttributes {
    readonly id: number
    contract: string
    type: string
    name: string
    owner?: string
    meta_name?: string
    meta_description?: string
    meta_image?: string
}

export type CollectionRequiredAttributes = Optional<CollectionAttributes, 'id'>
