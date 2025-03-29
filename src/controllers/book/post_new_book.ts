import { validateReqNewBook } from '../../utils/book/validate_req_new_book'
import { getOneBook } from '../../services/book/get_one_book'
import { newBook } from '../../services/book/new_book'
import { HttpCodes, UserPayload } from '../../types'
import { Request, Response } from 'express'

export const postNewBook = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload

  if (role !== 'librarian') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const data = validateReqNewBook(req.body)
    const { insertId: id } = await newBook(data)

    const getNewBook = await getOneBook(id)

    return res.status(HttpCodes.CREATED).json(getNewBook)
  } catch (e) {
    if (e instanceof Error) {
      res.status(HttpCodes.SERVER_ERROR).json({ message: e.message })
    }
  }
}
