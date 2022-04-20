import { DataTypes, Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB_NAME } = process.env

const sequelize = new Sequelize({
    host: MYSQL_HOST,
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB_NAME,
    dialect: 'mysql',
})

export default sequelize
