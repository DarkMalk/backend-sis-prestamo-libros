import { RowDataPacket } from 'mysql2'

export type IFineWithoutId = Omit<IFine, 'id'>

export interface IFine {
  id: number
  value: number
  state: 'pending' | 'paid'
}

export interface RDFine extends RowDataPacket {
  id: number
  value: number
  state: 'pending' | 'paid'
  username: string
  email: string
}
