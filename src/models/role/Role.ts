import { RowDataPacket } from 'mysql2'

export interface IRole extends RowDataPacket {
  id: number
  name: 'admin' | 'librarian' | 'client'
}
