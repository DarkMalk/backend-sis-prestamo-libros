import { conn } from '../../config/db'
import { RDFine } from '../../models/fine/Fine'
import { query } from '../../utils/querys'

export const checkFines = async (id: number) => {
  const [result] = await conn.query<RDFine[]>(query.checkFinesByUserId, [id])

  return result.length > 0
}
