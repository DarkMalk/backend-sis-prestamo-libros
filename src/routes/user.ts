import { Router } from 'express'
import { login, register } from '../controllers/user'
import { authenticate } from '../middlewares'

// Initial Route "/user/..."
const RouterUser = Router()

RouterUser.post('/login', login)
RouterUser.post('/register', authenticate, register)

export default RouterUser
