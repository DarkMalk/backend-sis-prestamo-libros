import { query } from '../../utils/loan/querys'
import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'

export const deleteLoan = async (id: number) => {
  const [result] = await conn.query<ResultSetHeader>(query.deleteLoan, [id])

  return result
}
