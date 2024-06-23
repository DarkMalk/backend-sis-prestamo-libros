import { conn } from '../../config/db'
import { RDBookInfo } from '../../models/book/BookInfo'
import { query } from '../../utils/querys'

export const getOneBookInfo = async (id: number) => {
  const [result] = await conn.query<[RDBookInfo]>(query.getOneBookInfo, [id])

  const [bookInfo] = result

  if (!bookInfo) {
    throw new Error('Book info not found')
  }

  return bookInfo
}
