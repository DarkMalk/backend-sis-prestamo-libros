import { RowDataPacket } from 'mysql2'
import { conn } from '../../config/db'
import { query } from '../../utils/querys'

interface CheckDisponibility extends RowDataPacket {
  disponibility: 'taken' | 'available'
}

export const checkDisponibilityBook = async (id: number) => {
  const [result] = await conn.query<[CheckDisponibility]>(query.checkDisponibilityBook, [id])

  const { disponibility } = result[0]

  return disponibility
}
