import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'
import { IAuthorWithoutId } from '../../models/author/Author'
import { query } from '../../utils/author/querys'

export const postNewAuthor = async ({ name, nationality }: IAuthorWithoutId) => {
  const [result] = await conn.query<ResultSetHeader>(query.postNewAuthor, [name, nationality])

  return result
}
