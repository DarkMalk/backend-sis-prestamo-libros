import { IBook } from '../../models/book/Book'

type IValidateReqNewBook = IBook & { genres: string[] }

export const validateReqNewBook = ({ name, author, genres, isbn, editorial }: Partial<IValidateReqNewBook>) => {
  if (!name || !author || !genres || !isbn || !editorial) {
    throw new Error('Missing required fields')
  }

  return { name, author, genres, isbn, editorial }
}
