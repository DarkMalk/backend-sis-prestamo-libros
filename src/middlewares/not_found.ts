import { Request, Response } from 'express'
import { HttpCodes } from '../types'

const notFound = (_: Request, res: Response) => {
  res.status(HttpCodes.NOT_FOUND).end()
}

export default notFound
