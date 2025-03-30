import { RDEditorial } from '../../models/editorial/editorial'
import { query } from '../../utils/editorial/querys'
import { conn } from '../../config/db'

export const getAllEditorials = async () => {
  const [result] = await conn.query<RDEditorial[]>(query.getEditorials)

  return result
}
