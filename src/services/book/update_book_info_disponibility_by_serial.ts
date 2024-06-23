import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'
import { query } from '../../utils/querys'

export const updateBookInfoDisponibilityBySerial = async (serial: string, disponibility: 'available' | 'taken') => {
  const [result] = await conn.query<ResultSetHeader>(query.updateBookInfoDisponibilityBySerial, [disponibility, serial])

  return result
}
