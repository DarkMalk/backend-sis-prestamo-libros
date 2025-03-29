import { IBook } from '../../models/book/Book'

export const validateReqNewBook = ({ name, author, isbn, editorial, genre, stock }: Partial<IBook>) => {
  if (!name || !author || !isbn || !editorial || !genre || !stock) {
    throw new Error('Missing required fields [name, author, isbn, editorial, genre, stock]')
  }

  return { name, author, isbn, editorial, genre, stock }
}
