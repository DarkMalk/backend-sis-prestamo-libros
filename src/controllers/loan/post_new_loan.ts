import { validateReqLoan } from '../../utils/loan/validate_req_loan'
import { getOneLoan } from '../../services/loan/get_one_loan'
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
    const { insertId: id } = await newLoan(data)

    const loan = await getOneLoan(id)

    return res.status(HttpCodes.CREATED).json(loan)
  } catch (e) {
    if (e instanceof Error) {
      res.status(HttpCodes.BAD_REQUEST).json({ message: e.message })
    }
  }
}
