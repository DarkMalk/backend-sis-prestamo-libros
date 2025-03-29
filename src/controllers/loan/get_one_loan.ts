import { getOneLoan as getOneLoanService } from '../../services/loan/get_one_loan'
import { Request, Response } from 'express'
import { HttpCodes, UserPayload } from '../../types'

export const getOneLoan = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload
  const { id } = req.params

  if (role !== 'librarian') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const loan = await getOneLoanService(Number(id))

    return res.status(HttpCodes.OK).json(loan)
  } catch (e) {
    if (!(e instanceof Error)) return
    return res.status(HttpCodes.SERVER_ERROR).json({ error: e.message })
  }
}
