import { updateBookStock } from '../../services/book/update_book_stock'
import { validateReqLoan } from '../../utils/loan/validate_req_loan'
import { getOneLoan } from '../../services/loan/get_one_loan'
import { getOneBook } from '../../services/book/get_one_book'
import { newLoan } from '../../services/loan/post_new_loan'
import { HttpCodes, UserPayload } from '../../types'
import { Request, Response } from 'express'

export const postNewLoan = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload

  if (role === 'client') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const data = validateReqLoan(req.body)
    const { stock } = await getOneBook(data.id_book)

    if (stock < 1) {
      return res.status(HttpCodes.BAD_REQUEST).json({ message: 'No stock available' })
    }

    const { insertId: id } = await newLoan(data)

    const { affectedRows } = await updateBookStock(data.id_book, stock - 1)
    if (!affectedRows) {
      return res.status(HttpCodes.BAD_REQUEST).json({ message: 'Error updating book stock' })
    }

    const loan = await getOneLoan(id)

    return res.status(HttpCodes.CREATED).json(loan)
  } catch (e) {
    if (e instanceof Error) {
      res.status(HttpCodes.BAD_REQUEST).json({ message: e.message })
    }
  }
}
