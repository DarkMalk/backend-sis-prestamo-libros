import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'
import { query } from '../../utils/querys'

export const updateFineStateDB = async (id: number) => {
  const [result] = await conn.query<ResultSetHeader>(query.updateFineState, [id])

  return result.affectedRows > 0
}
