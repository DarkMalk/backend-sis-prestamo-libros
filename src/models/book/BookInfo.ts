import { RowDataPacket } from 'mysql2'

export type IBookInfoWithoutId = Omit<IBookInfo, 'id'>

export interface IBookInfo {
  id: number
  id_book: number
  serial: string
  state: 'good' | 'details' | 'bad'
  desc_state: string
  disponibility: 'available' | 'taken'
}

export interface RDBookInfo extends RowDataPacket {
  id: number
  name: string
  serial: string
  state: 'good' | 'details' | 'bad'
  desc_state: string
  disponibility: 'available' | 'taken'
}
