import { conn } from '../../config/db'
import { RDFine } from '../../models/fine/Fine'
import { query } from '../../utils/querys'

export const getOneFine = async (id: number) => {
  const [result] = await conn.query<[RDFine]>(query.getOneFine, [id])
  const [fine] = result

  if (!fine) {
    throw new Error('Fine not found')
  }

  return fine
}
