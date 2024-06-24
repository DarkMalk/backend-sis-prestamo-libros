import { conn } from '../../config/db'
import { IUser } from '../../models/user/User'
import { query } from '../../utils/querys'

export const getAllUsers = async () => {
  const [users] = await conn.query<IUser[]>(query.getAllUsers)

  return users
}
