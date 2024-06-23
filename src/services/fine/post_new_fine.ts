import { ResultSetHeader } from 'mysql2'
import { conn } from '../../config/db'
import { IFineWithoutId } from '../../models/fine/Fine'
import { query } from '../../utils/querys'

export const newFine = async ({ value, state }: IFineWithoutId) => {
  const [result] = await conn.query<ResultSetHeader>(query.postNewFine, [value, state])

  return result
}
