import { Request, Response } from 'express'
import { validateReqNewBookInfo } from '../../utils/book/validate_req_new_book_info'
import { newBookInfo } from '../../services/book/new_book_info'
import { HttpCodes, UserPayload } from '../../types'
import { getOneBookInfo } from '../../services/book/get_one_book_info'

export const postNewBookInfo = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload

  if (role !== 'admin') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  const { id } = req.params
  const id_book = Number(id)

  try {
    const { serial, state, disponibility, desc_state } = validateReqNewBookInfo(req.body)

    const { insertId } = await newBookInfo({ id_book, serial, state, disponibility, desc_state })

    const bookInfo = await getOneBookInfo(insertId)

    return res.status(HttpCodes.CREATED).json(bookInfo)
  } catch (e) {
    if (e instanceof Error) {
      return res.status(HttpCodes.BAD_REQUEST).json({ message: e.message })
    }
  }
}
