import { ILoanWithoutId } from '../../models/loan/Loan'

const validateReqLoan = ({ id_book, id_user, id_book_info, start_date, finish_date }: ILoanWithoutId) => {
  if (!id_book || !id_user || !id_book_info || !start_date || !finish_date) {
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

  return { id_user, id_book, id_book_info, start_date, finish_date }
}

export { validateReqLoan }
