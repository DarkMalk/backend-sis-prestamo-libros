import { query } from '../../utils/book/querys'
import { conn } from '../../config/db'
import { IBook } from '../../models/book/Book'

export const getAllBooks = async () => {
  const [books] = await conn.query<IBook[]>(query.getAllBooks)
  return books
}
