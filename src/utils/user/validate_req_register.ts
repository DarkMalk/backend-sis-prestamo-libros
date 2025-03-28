import { IUser } from '../../models/user/User'

const validateReqRegister = ({ username, email, name, lastname, password, role }: Partial<IUser>) => {
  if (!username || !email || !name || !lastname || !password || !role) {
    throw new Error('Missing fields in request body: [username, email, name, lastname, password, role]')
  }

  if (typeof username !== 'string') {
    throw new Error('Username must be a string')
  }

  if (typeof email !== 'string') {
    throw new Error('Email must be a string')
  }

  if (typeof name !== 'string') {
    throw new Error('Name must be a string')
  }

  if (typeof lastname !== 'string') {
    throw new Error('Lastname must be a string')
  }

  if (typeof password !== 'string') {
    throw new Error('Password must be a string')
  }

  if (typeof role !== 'string') {
    throw new Error('Role must be a string')
  }

  if (role !== 'librarian' && role !== 'client') {
    throw new Error('Role must be one of the following: librarian, client')
  }

  return { username, email, name, lastname, password, role }
}

export default validateReqRegister
