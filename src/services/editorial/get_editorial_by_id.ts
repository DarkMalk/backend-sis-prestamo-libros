import { RDEditorial } from '../../models/editorial/editorial'
import { query } from '../../utils/editorial/querys'
import { conn } from '../../config/db'

export const getEditorialById = async (id: number) => {
  const [result] = await conn.query<RDEditorial[]>(query.getEditorialById, [id])
  const [editorial] = result

  if (!editorial) {
    throw new Error('Editorial not found')
  }

  return editorial
}
