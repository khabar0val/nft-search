import fs from 'fs'
import path from 'path'
import axios from 'axios'

/**
 *
 * @param url
 * @param name
 */
const download = async (url, name) => {
    try {
        const data = await axios({
            method: 'get',
            url,
            responseType: 'stream',
        })
        const extension = data.headers['content-type'].split('/')[1]
        const filename = `${name}.${extension}`
        await data.data.pipe(
            fs.createWriteStream(path.resolve('files', filename))
        )

        return filename
    } catch (e) {
        return null
    }
}

export { download }
