import { query } from '../../utils/author/querys'
import { conn } from '../../config/db'
import { IAuthor } from '../../models/author/Author'

export const getOneAuthor = async (id: number) => {
  const [result] = await conn.query<IAuthor[]>(query.getOneAuthor, [id])
  const author = result[0]

  if (!author) {
    throw new Error('Author not found')
  }

  return author
}
