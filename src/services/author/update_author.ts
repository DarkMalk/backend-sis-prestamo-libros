import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'
import { IAuthor } from '../../models/author/Author'
import { query } from '../../utils/author/querys'

export const updateAuthor = async ({ id, name, nationality }: IAuthor) => {
  const [result] = await conn.query<ResultSetHeader>(query.updateAuthor, [name, nationality, id])

  return result
}
