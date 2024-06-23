import { IAuthor } from '../../models/author/Author'

export const validateReqAuthor = ({ name, nationality }: Partial<IAuthor>) => {
  if (!name || !nationality) {
    throw new Error("It's necessary all fields to create an author: [name, nationality]")
  }

  return { name, nationality }
}
