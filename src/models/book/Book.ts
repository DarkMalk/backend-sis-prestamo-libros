import { RowDataPacket } from 'mysql2'

export type IBookWithoutId = Omit<IBook, 'id'>

export interface IBook {
  id: number
  name: string
  author: number
  isbn: string
  editorial: string
}

export interface RDBook extends RowDataPacket {
  id: number
  name: string
  author: string
  isbn: string
  editorial: string
  genres: string | string[]
}
