import { StateLoan } from '../../models/loan/Loan'
import { query } from '../../utils/loan/querys'
import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'

export const updateLoanState = async (id: number, state: StateLoan) => {
  const [result] = await conn.query<ResultSetHeader>(query.updateLoanState, [state, id])

  return result
}
