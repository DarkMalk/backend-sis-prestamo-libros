import { IGenre } from '../../models/genre/Genre'
import { query } from '../../utils/querys'
import { conn } from '../../config/db'

export const getOneGenre = async (id: number) => {
  const [result] = await conn.query<IGenre[]>(query.getOneGenre, [id])
  const genre = result[0]

  if (!genre) {
    throw new Error('Genre not found')
  }

  return genre
}
