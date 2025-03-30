import { query } from '../../utils/genre/querys'
import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'

export const updateGenre = async (id: number, name: string) => {
  const [result] = await conn.query<ResultSetHeader>(query.updateGenre, [name, id])

  return result
}
