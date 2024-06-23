import { conn } from '../../config/db'
import { query } from '../../utils/querys'

export const getGenresByBook = async (id: number) => {
  const [result] = await conn.query(query.getGenresForBook, [id])
  return result
}
