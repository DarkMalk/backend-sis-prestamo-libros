export type EnvPort = {
  serverPort: string | undefined
}

export type EnvDB = {
  HOST: string | undefined
  USERNAME: string | undefined
  PASSWORD: string | undefined
  DATABASE: string | undefined
}

export type EnvJWT = {
  JSONWEBTOKEN_SECRET: string | undefined
}

export type UserPayload = {
  id: number
  username: string
  role: 'librarian' | 'client'
}

export enum HttpCodes {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503
}
