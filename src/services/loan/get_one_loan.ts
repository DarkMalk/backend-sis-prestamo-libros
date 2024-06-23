import { conn } from '../../config/db'
import { RDLoan } from '../../models/loan/Loan'
import { query } from '../../utils/querys'

export const getOneLoan = async (id: number) => {
  const [result] = await conn.query<[RDLoan]>(query.getOneLoan, [id])
  const loan = result[0]

  if (!loan) {
    throw new Error('Loan not found')
  }

  return loan
}
