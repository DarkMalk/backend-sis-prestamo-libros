import { conn } from '../../config/db'
import { RDLoan } from '../../models/loan/Loan'
import { query } from '../../utils/loan/querys'

export const getAllLoans = async () => {
  const [loans] = await conn.query<RDLoan[]>(query.getAllLoans)

  return loans
}
