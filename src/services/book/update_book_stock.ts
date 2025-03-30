import { query } from '../../utils/book/querys'
import { conn } from '../../config/db'
import { ResultSetHeader } from 'mysql2'

export const updateBookStock = async (id: number, stock: number) => {
  const [result] = await conn.query<ResultSetHeader>(query.updateBookStock, [stock, id])

  return result
}
