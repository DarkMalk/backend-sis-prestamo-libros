import { RowDataPacket } from 'mysql2'

export type IEditorialWithoutId = Omit<IEditorial, 'id'>

export interface IEditorial {
  id: number
  name: string
}

export type RDEditorial = IEditorial & RowDataPacket
