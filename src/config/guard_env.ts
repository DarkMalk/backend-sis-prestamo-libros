import { EnvPort, EnvDB, EnvJWT } from '../types'
import dotenv from 'dotenv'
import path from 'node:path'

if (process.env.ENVIRONMENT === 'development') {
  dotenv.config({ path: path.resolve(__dirname, '..', '..', 'development.env') })
} else if (process.env.ENVIRONMENT === 'production') {
  dotenv.config({ path: path.resolve(__dirname, '..', '..', 'production.env') })
} else if (process.env.ENVIRONMENT === 'test') {
  dotenv.config({ path: path.resolve(__dirname, '..', '..', 'test.env') })
} else {
  throw new Error('Invalid environment')
}

const { PORT, HOST, USERNAME, PASSWORD, DATABASE, JSONWEBTOKEN_SECRET } = process.env

const guardPort = ({ serverPort }: EnvPort) => serverPort ?? 3000

const guardDB = ({ HOST, DATABASE, USERNAME, PASSWORD }: EnvDB) => {
  if (!HOST || !DATABASE || !USERNAME || !PASSWORD) {
    throw new Error('All database variables must be defined: HOST, DATABASE, USERNAME, PASSWORD')
  }

  return { HOST, DATABASE, USERNAME, PASSWORD }
}

const guardJwtSecret = ({ JSONWEBTOKEN_SECRET }: EnvJWT) => {
  if (!JSONWEBTOKEN_SECRET) {
    throw new Error('JSONWEBTOKEN_SECRET must be defined')
  }

  return JSONWEBTOKEN_SECRET
}

const serverPort = guardPort({ serverPort: PORT })
const dbConfig = guardDB({ HOST, DATABASE, USERNAME, PASSWORD })
const jwtSecret = guardJwtSecret({ JSONWEBTOKEN_SECRET })

export { serverPort, dbConfig, jwtSecret }
