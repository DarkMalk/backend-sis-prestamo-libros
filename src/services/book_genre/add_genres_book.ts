import { query } from '../../utils/querys'
import { conn } from '../../config/db'

const addGenreBook = async (bookId: number, genreId: number) => {
  const [result] = await conn.query(query.postGenreForBook, [bookId, genreId])
  return result
}

export { addGenreBook }
