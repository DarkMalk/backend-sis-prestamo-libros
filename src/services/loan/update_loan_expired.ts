import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'
import { query } from '../../utils/querys'

export const updateLoanStateToExpired = async (id: number) => {
  const [result] = await conn.query<ResultSetHeader>(query.updateLoanStateToExpired, [id])

  return result
}
