import { conn } from '../../config/db'
import { RDBookInfo } from '../../models/book/BookInfo'
import { query } from '../../utils/querys'

export const getAllBooksInfo = async (id: number) => {
  const [books] = await conn.query<RDBookInfo[]>(query.getBookInfoById, [id])

  if (!books.length) {
    throw new Error('No books found')
  }

  return books
}
