import { RowDataPacket } from 'mysql2'

export type IAuthorWithoutId = Omit<IAuthor, 'id'>

export interface IAuthor extends RowDataPacket {
  id: number
  name: string
  nationality: string
}
