import { deleteLoan as deleteLoanService } from '../../services/loan/delete_loan'
import { Request, Response } from 'express'
import { HttpCodes, UserPayload } from '../../types'

export const deleteLoan = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload
  const { id } = req.params

  if (role !== 'librarian') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const { affectedRows } = await deleteLoanService(Number(id))

    if (!affectedRows) {
      return res.status(HttpCodes.NOT_FOUND).json({ message: 'Loan not found' })
    }

    return res.status(HttpCodes.NO_CONTENT).end()
  } catch (e) {
    if (!(e instanceof Error)) return
    return res.status(HttpCodes.SERVER_ERROR).json({ message: e.message })
  }
}
