import { conn } from '../../config/db'
import { IUser } from '../../models/user/User'
import { query } from '../../utils/user/querys'

const getUserByUsername = async (username: string) => {
  const [result] = await conn.query<[IUser]>(query.getUserByUsername, [username])
  const [user] = result

  if (!user) throw new Error('User not found')

  return user
}

export { getUserByUsername }
