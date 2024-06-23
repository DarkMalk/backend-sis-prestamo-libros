import { dbConfig } from './guard_env'
import mysql, { ConnectionOptions } from 'mysql2/promise'

const access: ConnectionOptions = {
  user: dbConfig.USERNAME,
  password: dbConfig.PASSWORD,
  host: dbConfig.HOST,
  database: dbConfig.DATABASE
}

const conn = mysql.createPool(access)

export { conn }
