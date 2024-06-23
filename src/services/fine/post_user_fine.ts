import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'
import { query } from '../../utils/querys'

export const postUserFine = async (username: string, id_fine: number) => {
  const [result] = await conn.query<ResultSetHeader>(query.postUserFine, [username, id_fine])

  return result
}
