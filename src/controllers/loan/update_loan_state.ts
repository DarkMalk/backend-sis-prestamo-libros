import { updateLoanState as updateLoanStateService } from '../../services/loan/update_loan_state'
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

    res.status(HttpCodes.OK).json(loan)
  } catch (e) {
    if (e instanceof Error) {
      res.status(HttpCodes.SERVER_ERROR).json({ message: e.message })
    }
  }
}
