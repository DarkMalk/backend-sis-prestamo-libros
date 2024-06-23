import { IGenreWithoutId } from '../../models/genre/Genre'
import { query } from '../../utils/querys'
import { conn } from '../../config/db'
import { ResultSetHeader } from 'mysql2'

export const newGenre = async ({ name }: IGenreWithoutId) => {
  const [result] = await conn.query<ResultSetHeader>(query.newGenre, [name])

  return result
}
