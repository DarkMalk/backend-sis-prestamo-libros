import { getAllBooks } from '../../services/book/get_all_book'
import { Request, Response } from 'express'
import { HttpCodes } from '../../types'

export const getBooks = async (_: Request, res: Response) => {
  try {
    const books = await getAllBooks()
    return res.status(HttpCodes.OK).json(books)
  } catch (e) {
    if (!(e instanceof Error)) return
    return res.status(HttpCodes.BAD_REQUEST).json({ message: e.message })
  }
}
