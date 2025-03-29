import { RowDataPacket } from 'mysql2'

export type IBookWithoutId = Omit<IBook, 'id'>

export interface IBook extends RowDataPacket {
  id: number
  name: string
  genre: string
  author: number
  isbn: string
  editorial: string
  stock: number
}
