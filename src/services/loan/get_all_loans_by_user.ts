import { conn } from '../../config/db'
import { RDLoan } from '../../models/loan/Loan'
import { query } from '../../utils/querys'

export const getAllLoansByUser = async (id: number) => {
  const [loans] = await conn.query<RDLoan[]>(query.getAllLoansByUser, [id])

  return loans
}
