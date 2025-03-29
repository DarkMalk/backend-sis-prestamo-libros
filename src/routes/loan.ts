import { updateLoanState } from '../controllers/loan/update_loan_state'
import { postNewLoan } from '../controllers/loan/post_new_loan'
import { getLoans } from '../controllers/loan/get_all_loans'
import { getOneLoan } from '../controllers/loan/get_one_loan'
import { deleteLoan } from '../controllers/loan/delete_loan'
import { authenticate } from '../middlewares'
import { Router } from 'express'

const RouterLoan = Router()

RouterLoan.get('/', authenticate, getLoans)
RouterLoan.get('/:id', authenticate, getOneLoan)
RouterLoan.post('/', authenticate, postNewLoan)
RouterLoan.patch('/:id', authenticate, updateLoanState)
RouterLoan.delete('/:id', authenticate, deleteLoan)

export { RouterLoan }
