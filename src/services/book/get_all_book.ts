import { query } from '../../utils/querys'
import { conn } from '../../config/db'
import { RDBook } from '../../models/book/Book'

export const getAllBooks = async () => {
  const [books] = await conn.query<RDBook[]>(query.getAllBooks)
  for (const book of books) {
    if (typeof book.genres !== 'string') continue
    if (!book.genres.length) {
      book.genres = []
    } else {
      book.genres = book.genres.split(',')
    }
  }
  return books
}
