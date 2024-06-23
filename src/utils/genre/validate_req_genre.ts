import { IGenre } from '../../models/genre/Genre'

export const validateReqGenre = ({ name }: Partial<IGenre>) => {
  if (!name) throw new Error('Property name is required')
  return { name }
}
