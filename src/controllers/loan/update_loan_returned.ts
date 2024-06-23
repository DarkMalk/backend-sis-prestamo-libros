import { Request, Response } from 'express'
import { updateLoanStateToReturned } from '../../services/loan/update_loan_returned'
import { HttpCodes, UserPayload } from '../../types'
import { getOneLoan } from '../../services/loan/get_one_loan'
import { updateBookInfoDisponibilityBySerial } from '../../services/book/update_book_info_disponibility_by_serial'

export const updateLoanReturned = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload

  if (role === 'client') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  const { id: idString } = req.params

  try {
    const id = Number(idString)

    const { affectedRows } = await updateLoanStateToReturned(id)

    if (!affectedRows) {
      return res.status(HttpCodes.BAD_REQUEST).json({ message: "Don't update loan state" })
    }

    const loan = await getOneLoan(id)

    await updateBookInfoDisponibilityBySerial(loan.serial, 'available')

    res.status(HttpCodes.OK).json(loan)
  } catch (e) {
    if (e instanceof Error) {
      res.status(HttpCodes.SERVER_ERROR).json({ message: e.message })
    }
  }
}
