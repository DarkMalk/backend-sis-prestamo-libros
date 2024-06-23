import { conn } from '../../config/db'
import { RDFine } from '../../models/fine/Fine'
import { query } from '../../utils/querys'

export const getAllFines = async () => {
  const [result] = await conn.query<RDFine[]>(query.getAllFines)

  return result
}
