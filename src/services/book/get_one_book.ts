import { conn } from '../../config/db'
import { IBook } from '../../models/book/Book'
import { query } from '../../utils/book/querys'

export const getOneBook = async (id: number) => {
  const [result] = await conn.query<[IBook]>(query.getOneBookById, [id])
  const book = result[0]

  if (!book) {
    throw new Error('Book not found')
  }

  return book
}
