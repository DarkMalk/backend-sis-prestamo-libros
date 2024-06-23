import { Request, Response } from 'express'
import { getAllBooksInfo } from '../../services/book/get_all_book_info'
import { HttpCodes } from '../../types'

export const getBooksInfo = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const books = await getAllBooksInfo(Number(id))

    return res.status(HttpCodes.OK).json(books)
  } catch (e) {
    if (e instanceof Error) {
      res.status(HttpCodes.BAD_REQUEST).json({ message: e.message })
    }
  }
}
