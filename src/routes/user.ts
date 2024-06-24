import { Router } from 'express'
import { login, register } from '../controllers/user'
import { authenticate } from '../middlewares'
import { allUsers } from '../controllers/user/get_all_users'

// Initial Route "/user/..."
const RouterUser = Router()

RouterUser.get('/', authenticate, allUsers)
RouterUser.post('/login', login)
RouterUser.post('/register', authenticate, register)

export default RouterUser
