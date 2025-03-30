import { query } from '../../utils/editorial/querys'
import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'

export const deleteEditorial = async (id: number) => {
  const [result] = await conn.query<ResultSetHeader>(query.deleteEditorial, [id])

  return result
}
