import { Request, Response } from 'express'
import { getAllLoans } from '../../services/loan/get_all_loans'
import { HttpCodes, UserPayload } from '../../types'
import { RDLoan } from '../../models/loan/Loan'
import { getAllLoansByUser } from '../../services/loan/get_all_loans_by_user'

export const getLoans = async (req: Request, res: Response) => {
  const { id, role } = req.body.user as UserPayload
  let loans: RDLoan[] = []

  try {
    if (role === 'client') {
      loans = await getAllLoansByUser(id)
    } else {
      loans = await getAllLoans()
    }

    res.status(HttpCodes.OK).json(loans)
  } catch (e) {
    if (e instanceof Error) {
      res.status(HttpCodes.SERVER_ERROR).json({ message: e.message })
    }
  }
}
