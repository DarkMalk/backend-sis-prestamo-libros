import { query } from '../../utils/book/querys'
import { IBook } from '../../models/book/Book'
import { conn } from '../../config/db'

export const getOneBookByName = async (name: string) => {
  const [result] = await conn.query<IBook[]>(query.getOneBookByName, [name])
  const book = result[0]

  if (!book) {
    throw new Error('Book not found')
  }

  return book
}
