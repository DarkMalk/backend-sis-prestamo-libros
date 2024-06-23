import { RowDataPacket } from 'mysql2'

export type ILoanWithoutId = Omit<ILoan, 'id'>

export interface ILoan {
  id: number
  id_user: number
  id_book: number
  id_book_info: number
  start_date: Date
  finish_date: Date
  state: 'active' | 'returned' | 'expired'
}

export interface RDLoan extends RowDataPacket {
  id: number
  book_name: string
  username: string
  serial: string
  start_date: Date
  finish_date: Date
  state: 'active' | 'returned' | 'expired'
}
