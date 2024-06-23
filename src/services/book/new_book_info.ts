import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'
import { IBookInfoWithoutId } from '../../models/book/BookInfo'
import { query } from '../../utils/querys'

export const newBookInfo = async ({ id_book, serial, disponibility, desc_state, state }: IBookInfoWithoutId) => {
  const [result] = await conn.query<ResultSetHeader>(query.postNewBookInfo, [
    id_book,
    serial,
    state,
    disponibility,
    desc_state
  ])

  return result
}
