import { ILoanWithoutId } from '../../models/loan/Loan'

const validateReqLoan = ({ id_book, id_user, id_book_info, start_date, finish_date, state }: ILoanWithoutId) => {
  if (!id_book || !id_user || !id_book_info || !start_date || !finish_date || !state) {
    throw new Error('Missing required fields in request body')
  }

  if (typeof id_book !== 'number') {
    throw new Error('id_book must be a number')
  }

  if (typeof id_user !== 'number') {
    throw new Error('id_user must be a number')
  }

  if (typeof id_book_info !== 'number') {
    throw new Error('id_book_info must be a number')
  }

  if (typeof start_date !== 'string') {
    throw new Error('start_date must be a string')
  }

  if (typeof finish_date !== 'string') {
    throw new Error('finish_date must be a string')
  }

  if (typeof state !== 'string') {
    throw new Error('state must be a string')
  }

  if (state !== 'active' && state !== 'returned' && state !== 'expired') {
    throw new Error('state must be active, returned or expired')
  }

  return { id_user, id_book, id_book_info, start_date, finish_date, state }
}

export { validateReqLoan }
