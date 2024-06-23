import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'
import { query } from '../../utils/querys'

export const updateLoanStateToReturned = async (id: number) => {
  const [result] = await conn.query<ResultSetHeader>(query.updateLoanStateToReturned, [id])

  return result
}
