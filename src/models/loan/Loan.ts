import { RowDataPacket } from 'mysql2'

export type ILoanWithoutId = Omit<ILoan, 'id'>

export type StateLoan = 'active' | 'returned' | 'expired'

export interface ILoan {
  id: number
  id_user: number
  id_book: number
  start_date: string
  finish_date: string
  state: StateLoan
}

export interface RDLoan extends RowDataPacket {
  id: number
  book: string
  username: string
  start_date: string
  finish_date: string
  state: StateLoan
}
