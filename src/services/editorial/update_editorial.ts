import { IEditorial } from '../../models/editorial/editorial'
import { query } from '../../utils/editorial/querys'
import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'

export const updateEditorial = async ({ id, name }: IEditorial) => {
  const [result] = await conn.query<ResultSetHeader>(query.updateEditorial, [name, id])

  return result
}
