import { Request, Response, NextFunction } from 'express'
import { jwtSecret } from '../config/guard_env'
import { HttpCodes } from '../types'
import jwt from 'jsonwebtoken'

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Token not provided' })
  }

  const [method, token] = authorization.trim().split(' ')

  if (method !== 'Bearer' || !token) {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Token or method not provided' })
  }

  try {
    const payload = jwt.verify(token, jwtSecret)
    req.body = { ...req.body, user: payload }
  } catch (e) {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Invalid token' })
  }

  next()
}

export default authenticate
