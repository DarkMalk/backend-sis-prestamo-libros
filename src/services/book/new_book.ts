import { query } from '../../utils/querys'
import { conn } from '../../config/db'
import { IBookWithoutId } from '../../models/book/Book'
import { ResultSetHeader } from 'mysql2'

export const newBook = async ({ name, author, editorial, isbn }: IBookWithoutId) => {
  const [result] = await conn.query<ResultSetHeader>(query.postNewBook, [name, author, editorial, isbn])
  return result
}
