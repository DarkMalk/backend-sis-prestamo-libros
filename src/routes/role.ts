import { Router } from 'express'
import { getAllRoles, getOneRole } from '../controllers/role'
import { authenticate } from '../middlewares'

const RouterRole = Router()

RouterRole.get('/', authenticate, getAllRoles)
RouterRole.get('/:id', authenticate, getOneRole)

export default RouterRole
