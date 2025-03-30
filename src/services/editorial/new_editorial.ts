import { IEditorialWithoutId } from '../../models/editorial/editorial'
import { query } from '../../utils/editorial/querys'
import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'

export const newEditorial = async ({ name }: IEditorialWithoutId) => {
  const [result] = await conn.query<ResultSetHeader>(query.newEditorial, [name])

  return result
}
