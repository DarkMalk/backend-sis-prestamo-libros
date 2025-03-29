import { query } from '../../utils/book/querys'
import { conn } from '../../config/db'
import { IBookWithoutId } from '../../models/book/Book'
import { ResultSetHeader } from 'mysql2'

export const newBook = async ({ name, author, editorial, isbn, genre, stock }: IBookWithoutId) => {
  const [result] = await conn.query<ResultSetHeader>(query.postNewBook, [name, genre, author, isbn, editorial, stock])
  return result
}
