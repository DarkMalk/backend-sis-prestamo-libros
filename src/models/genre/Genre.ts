import { RowDataPacket } from 'mysql2'

export type IGenreWithoutId = Omit<IGenre, 'id'>

export interface IGenre extends RowDataPacket {
  id: number
  name: string
}
