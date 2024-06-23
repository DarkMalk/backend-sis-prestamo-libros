import { validateReqNewBook } from '../../utils/book/validate_req_new_book'
import { newBook } from '../../services/book/new_book'
import { HttpCodes, UserPayload } from '../../types'
import { Request, Response } from 'express'
import { addGenreBook } from '../../services/book_genre/add_genres_book'
import { getOneBook } from '../../services/book/get_one_book'

export const postNewBook = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload

  if (role !== 'admin') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const { genres, ...bookData } = validateReqNewBook(req.body)
    const { insertId: id } = await newBook(bookData)

    if (typeof genres === 'object') {
      for (const genreId of genres) {
        await addGenreBook(id, Number(genreId))
      }
    }

    const getNewBook = await getOneBook(id)

    return res.status(HttpCodes.CREATED).json(getNewBook)
  } catch (e) {
    if (e instanceof Error) {
      res.status(HttpCodes.SERVER_ERROR).json({ message: e.message })
    }
  }
}
