import { conn } from '../../config/db'
import { query } from '../../utils/querys'

export const updateBookInfoDisponibility = async (id: number, disponibility: 'available' | 'taken') => {
  const [result] = await conn.query(query.updateBookInfoDisponibility, [disponibility, id])

  return result
}
