import dotenv from 'dotenv'

dotenv.config()

import _init from './models/index'
import * as crypto from 'crypto'
import { Rarible } from './services/Rarible'
import { download } from './services/Downloader'
import { Item } from './models/Item'
import { Collection } from './models/Collection'

async function parseCollections(parser: Rarible, continuation?: string) {
    let collections_continuation = continuation

    const collections = await parser.getCollections(collections_continuation)

    for (const collection of collections.collections) {
        try {
            if (collection.meta && collection.meta.image) {
                // Download collection image
                console.log(`Downloading image for collection ${collection.id} ...`)
                const filename = await download(
                    collection.meta.image.url.ORIGINAL,
                    `COL_` + collection.id
                )

                if (filename) {
                    // Save collection to DB
                    const coll = await Collection.create({
                        contract: collection.id,
                        type: collection.type,
                        name: collection.name,
                        owner: collection.owner ?? null,
                        meta_name: collection.meta.name ?? null,
                        meta_description: collection.meta.description ?? null,
                        meta_image: filename,
                    })

                    // Parse items
                    const items = await parser.getCollectionItems(collection.id)
                    for (const item of items.items) {
                        const NFT = await parser.getItem(item.id)
                        if (NFT.meta && NFT.meta.image) {
                            // Download NFT image
                            console.log(`Downloading image for NFT ${NFT.id} ...`)
                            const NFT_filename = await download(
                                NFT.meta.image.url.ORIGINAL,
                                `NFT_` +
                                crypto
                                    .createHash('sha256')
                                    .update(NFT.id)
                                    .digest('hex')
                            )

                            if (NFT_filename) {
                                // Save NFT to DB
                                const collection_id: any = coll.get('id')
                                await Item.create({
                                    collection_id,
                                    token_id: NFT.tokenId,
                                    meta_name: NFT.meta.name ?? null,
                                    meta_description: NFT.meta.description ?? null,
                                    meta_image: NFT_filename,
                                })
                            }
                        }
                    }
                }
            }
        } catch (e) {

        }
    }

    if (collections.continuation) {
        collections_continuation = collections.continuation
        await parseCollections(parser, collections_continuation)
    }
}

;(async () => {
    // await _init()
    let collections_continuation = ''
    const parser = new Rarible()
    await parseCollections(parser, collections_continuation)
})()
