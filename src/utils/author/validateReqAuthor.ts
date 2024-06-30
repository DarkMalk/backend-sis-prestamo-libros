import { IAuthor } from '../../models/author/Author'

export const validateReqAuthor = ({ name, nationality }: Partial<IAuthor>) => {
  if (!name || !nationality) {
    throw new Error("It's necessary all fields to create an author: [name, nationality]")
  }

  if (typeof name !== 'string') {
    throw new Error('The name must be a string')
  }

  if (typeof nationality !== 'string') {
    throw new Error('The nationality must be a string')
  }

  return { name, nationality }
}
