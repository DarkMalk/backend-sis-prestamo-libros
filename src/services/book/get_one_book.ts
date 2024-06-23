import { conn } from '../../config/db'
import { RDBook } from '../../models/book/Book'
import { query } from '../../utils/querys'

export const getOneBook = async (id: number) => {
  const [result] = await conn.query<[RDBook]>(query.getOneBookById, [id])
  const book = result[0]

  if (!book) {
    throw new Error('Book not found')
  }

  if (!book.genres.length) {
    book.genres = []
  }
  if (typeof book.genres === 'string') {
    book.genres = book.genres.split(',')
  }

  return book
}
