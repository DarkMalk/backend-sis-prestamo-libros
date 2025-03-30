import { IEditorialWithoutId } from '../../models/editorial/editorial'

export const validateEditorial = ({ name }: Partial<IEditorialWithoutId>) => {
  if (!name) {
    throw new Error('Name is required')
  }

  if (typeof name !== 'string') {
    throw new Error('Name must be a string')
  }

  if (name.length < 1) {
    throw new Error('Name is too short')
  }

  if (name.length > 80) {
    throw new Error('Name is too long')
  }

  return { name }
}
