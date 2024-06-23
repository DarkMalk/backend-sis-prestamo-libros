import { RowDataPacket } from 'mysql2'

export type IUserWithoutId = Omit<IUser, 'id'>

export interface IUser extends RowDataPacket {
  id: number
  username: string
  email: string
  name: string
  lastname: string
  password: string
  role: 'admin' | 'librarian' | 'client'
}
