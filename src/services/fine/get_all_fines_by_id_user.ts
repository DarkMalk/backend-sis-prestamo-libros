import { conn } from '../../config/db'
import { RDFine } from '../../models/fine/Fine'
import { query } from '../../utils/querys'

export const getAllFinesByUserId = async (id: number) => {
  const [fines] = await conn.query<RDFine[]>(query.getAllFinesByUserId, [id])

  return fines
}
