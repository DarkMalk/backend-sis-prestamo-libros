import { conn } from '../../config/db'
import { IAuthor } from '../../models/author/Author'
import { query } from '../../utils/author/querys'

export const getAllAuthors = async () => {
  const [authors] = await conn.query<IAuthor[]>(query.getAuthors)

  return authors
}
