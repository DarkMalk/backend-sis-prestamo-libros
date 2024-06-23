import { getAuthors } from '../controllers/author/get_authors'
import { Router } from 'express'
import { postAuthor } from '../controllers/author/post_author'
import { authenticate } from '../middlewares'

const RouterAuthor = Router()

RouterAuthor.get('/', getAuthors)
RouterAuthor.post('/', authenticate, postAuthor)

export { RouterAuthor }
