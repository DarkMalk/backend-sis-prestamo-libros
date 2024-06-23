import { Request, Response } from 'express'
import { HttpCodes, UserPayload } from '../../types'
import { validateReqLoan } from '../../utils/loan/validate_req_loan'
import { newLoan } from '../../services/loan/post_new_loan'
import { getOneLoan } from '../../services/loan/get_one_loan'
import { updateBookInfoDisponibility } from '../../services/book/update_book_info_disponibility'
import { checkDisponibilityBook } from '../../services/book/check_disponibility_book'
import { checkFines } from '../../services/fine/check_fines'

export const postNewLoan = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload

  if (role === 'client') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const { id_user, id_book, id_book_info, start_date, finish_date, state } = validateReqLoan(req.body)

    const checkFine = await checkFines(id_user)
    if (checkFine) {
      throw new Error('User has fines, it is not possible to make a loan')
    }

    const disponibilityBook = await checkDisponibilityBook(id_book_info)
    if (disponibilityBook !== 'available') {
      throw new Error('Book is not available')
    }

    const { insertId } = await newLoan({
      id_user,
      id_book,
      id_book_info,
      start_date,
      finish_date,
      state
    })

    const loan = await getOneLoan(insertId)

    await updateBookInfoDisponibility(id_book_info, 'taken')

    return res.status(HttpCodes.CREATED).json(loan)
  } catch (e) {
    if (e instanceof Error) {
      res.status(HttpCodes.BAD_REQUEST).json({ message: e.message })
    }
  }
}
