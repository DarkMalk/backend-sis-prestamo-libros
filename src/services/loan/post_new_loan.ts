import { ILoanWithoutId } from '../../models/loan/Loan'
import { query } from '../../utils/loan/querys'
import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'

export const newLoan = async ({ id_user, id_book, start_date, finish_date }: Omit<ILoanWithoutId, 'state'>) => {
  const [result] = await conn.query<ResultSetHeader>(query.postNewLoan, [id_user, id_book, start_date, finish_date])

  return result
}
