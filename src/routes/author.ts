import { getAuthors } from '../controllers/author/get_authors'
import { Router } from 'express'
import { postAuthor } from '../controllers/author/post_author'
import { authenticate } from '../middlewares'
import { updateAuthors } from '../controllers/author/update_authors'

const RouterAuthor = Router()

RouterAuthor.get('/', getAuthors)
RouterAuthor.post('/', authenticate, postAuthor)
RouterAuthor.put('/:id', authenticate, updateAuthors)

export { RouterAuthor }
