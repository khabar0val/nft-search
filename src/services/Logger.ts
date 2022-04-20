import dotenv from 'dotenv'

dotenv.config({})

const { NODE_ENV } = process.env

import * as winston from 'winston'
import { createLogger, format, transports } from 'winston'

const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: \r\n ${message}`
})

const logger = createLogger({
    format: combine(timestamp(), myFormat),
    transports: [
        new transports.File({
            filename: './logs/error.log',
            level: 'error',
        }),
        new transports.File({
            filename: './logs/info.log',
            level: 'info',
        }),
    ],
})

export const Logger = {
    log: (level, message) => {
        NODE_ENV === 'production'
            ? logger.log({ level, message })
            : console.log(level, message)
    },
}
