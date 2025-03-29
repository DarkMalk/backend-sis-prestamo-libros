import { query } from '../../utils/genre/querys'
import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'

export const deleteGenre = async (id: number) => {
  const [result] = await conn.query<ResultSetHeader>(query.deleteGenre, [id])

  return result
}
