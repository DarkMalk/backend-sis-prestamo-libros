import { Router } from 'express'
import { getFines } from '../controllers/fine/get_fines'
import { updateFineState } from '../controllers/fine/update_fine_state'
import { authenticate } from '../middlewares'

const RouterFine = Router()

RouterFine.get('/', authenticate, getFines)
RouterFine.put('/paid/:id', authenticate, updateFineState)

export { RouterFine }
