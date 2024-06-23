import { IFineWithoutId } from '../../models/fine/Fine'

type Req = IFineWithoutId & { username: string }

export const validateReqFine = ({ state, value, username }: Partial<Req>) => {
  if (!state || !value || !username) {
    throw new Error('Missing required fields: state, value or username')
  }

  if (typeof username !== 'string') {
    throw new Error('Username must be a string')
  }

  if (typeof state !== 'string') {
    throw new Error('State must be a string')
  }

  if (typeof value !== 'number') {
    throw new Error('Value must be a number')
  }

  if (state !== 'pending' && state !== 'paid') {
    throw new Error("State must be 'pending' or 'paid'")
  }

  return { state, value, username }
}
