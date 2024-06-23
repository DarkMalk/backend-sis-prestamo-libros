import { getGenres } from '../../services/genre/get_all_genre'
import { Request, Response } from 'express'
import { HttpCodes } from '../../types'

export const getAllGenre = async (_: Request, res: Response) => {
  try {
    const genres = await getGenres()

    return res.status(HttpCodes.OK).json(genres)
  } catch (e) {
    if (e instanceof Error) {
      return res.status(HttpCodes.SERVER_ERROR).json({ message: e.message })
    }
  }
}
