import axios from 'axios'

export class Rarible {
    /**
     *
     * @param continuation
     */
    public async getCollections(continuation?: string) {
        console.log(`Getting collections from ${continuation}...`)
        const { data } = await axios.get(
            `https://ethereum-api.rarible.org/v0.1/nft/collections/all`,
            {
                params: {
                    size: 500,
                    continuation: continuation ?? '',
                },
            }
        )

        return data
    }

    /**
     *
     * @param collection
     * @param continuation
     */
    public async getCollectionItems(collection: string, continuation?: string) {
        console.log(`Getting items of collection ${collection}...`)
        const { data } = await axios.get(
            `https://ethereum-api.rarible.org/v0.1/nft/items/byCollection`,
            {
                params: {
                    size: 500,
                    collection,
                    continuation: continuation ?? '',
                },
            }
        )

        return data
    }

    /**
     *
     * @param item
     */
    public async getItem(item: string) {
        console.log(`Getting item ${item}...`)
        const { data } = await axios.get(
            `https://ethereum-api.rarible.org/v0.1/nft/items/${item}`
        )

        return data
    }
}
