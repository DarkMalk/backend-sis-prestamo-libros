import { IBookInfoWithoutId } from '../../models/book/BookInfo'

export const validateReqNewBookInfo = ({ serial, state, disponibility, desc_state }: Partial<IBookInfoWithoutId>) => {
  if (!serial || !state || !disponibility || !desc_state) {
    throw new Error('Missing required fields: serial, state, disponibility, desc_state')
  }

  if (typeof serial !== 'string') {
    throw new Error('serial must be a string')
  }

  if (typeof state !== 'string') {
    throw new Error('state must be a string')
  }

  if (typeof disponibility !== 'string') {
    throw new Error('disponibility must be a string')
  }

  if (typeof desc_state !== 'string') {
    throw new Error('desc_state must be a string')
  }

  if (state !== 'good' && state !== 'details' && state !== 'bad') {
    throw new Error('state must be one of: good, details, bad')
  }

  if (disponibility !== 'available' && disponibility !== 'taken') {
    throw new Error('disponibility must be one of: available, taken')
  }

  return { serial, state, disponibility, desc_state }
}
