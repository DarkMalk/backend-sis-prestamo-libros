import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'
import { ILoanWithoutId } from '../../models/loan/Loan'
import { query } from '../../utils/querys'

export const newLoan = async ({ id_user, id_book, id_book_info, start_date, finish_date, state }: ILoanWithoutId) => {
  const [result] = await conn.query<ResultSetHeader>(query.postNewLoan, [
    id_user,
    id_book,
    start_date,
    finish_date,
    state,
    id_book_info
  ])

  return result
}
