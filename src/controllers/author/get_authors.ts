import { Request, Response } from 'express'
import { HttpCodes } from '../../types'
import { getAllAuthors } from '../../services/author/get_all_authors'

export const getAuthors = async (_: Request, res: Response) => {
  try {
    const authors = await getAllAuthors()
    res.status(HttpCodes.OK).json(authors)
  } catch (e) {
    if (e instanceof Error) {
      res.status(HttpCodes.BAD_REQUEST).json({ message: e.message })
    }
  }
}
