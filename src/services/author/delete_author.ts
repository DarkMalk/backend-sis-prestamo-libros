import { query } from '../../utils/author/querys'
import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'

export const deleteAuthor = async (id: number) => {
  const [result] = await conn.query<ResultSetHeader>(query.deleteAuthor, [id])

  return result
}
