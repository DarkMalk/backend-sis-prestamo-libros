import { IGenre } from '../../models/genre/Genre'
import { conn } from '../../config/db'
import { query } from '../../utils/genre/querys'

export const getGenres = async () => {
  const [genres] = await conn.query<IGenre[]>(query.getGenres)

  return genres
}
