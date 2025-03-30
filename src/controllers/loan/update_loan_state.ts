import { updateLoanState as updateLoanStateService } from '../../services/loan/update_loan_state'
import { getOneBookByName } from '../../services/book/get_one_book_by_name'
import { updateBookStock } from '../../services/book/update_book_stock'
import { getOneLoan } from '../../services/loan/get_one_loan'
import { HttpCodes, UserPayload } from '../../types'
import { Request, Response } from 'express'

export const updateLoanState = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload

  if (role !== 'librarian') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  const { id: idString } = req.params

  try {
    const id = Number(idString)

    const { affectedRows } = await updateLoanStateService(id, 'returned')

    if (!affectedRows) {
      return res.status(HttpCodes.BAD_REQUEST).json({ message: "Don't update loan state" })
    }

    const loan = await getOneLoan(id)
    const { id: idBook, stock } = await getOneBookByName(loan.book)

    const { affectedRows: affectedRowsBook } = await updateBookStock(idBook, stock + 1)

    if (!affectedRowsBook) {
      return res.status(HttpCodes.BAD_REQUEST).json({ message: "Don't update book stock" })
    }

    res.status(HttpCodes.OK).json(loan)
  } catch (e) {
    if (e instanceof Error) {
      res.status(HttpCodes.SERVER_ERROR).json({ message: e.message })
    }
  }
}
