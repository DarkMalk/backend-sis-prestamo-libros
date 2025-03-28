import { conn } from '../../config/db'
import { IUserWithoutId } from '../../models/user/User'
import { query } from '../../utils/user/querys'

const createUser = async ({ username, email, name, lastname, password, role }: IUserWithoutId) => {
  const [result] = await conn.query(query.postNewUser, [username, email, name, lastname, password, role])

  return result
}

export { createUser }
