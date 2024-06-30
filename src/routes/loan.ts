import { getLoans } from '../controllers/loan/get_all_loans'
import { Router } from 'express'
import { postNewLoan } from '../controllers/loan/post_new_loan'
import { authenticate } from '../middlewares'
import { updateLoanReturned } from '../controllers/loan/update_loan_returned'

const RouterLoan = Router()

RouterLoan.get('/', authenticate, getLoans)
RouterLoan.post('/', authenticate, postNewLoan)
RouterLoan.patch('/:id', authenticate, updateLoanReturned)

export { RouterLoan }
