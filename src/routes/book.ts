import { postNewBook } from '../controllers/book/post_new_book'
import { getOneBook } from '../controllers/book/get_one_book'
import { getBooks } from '../controllers/book/get_books'
import { authenticate } from '../middlewares'
import { Router } from 'express'

// /api/book
const RouterBook = Router()

RouterBook.get('/', getBooks)
RouterBook.get('/:id', getOneBook)
RouterBook.post('/', authenticate, postNewBook)

export default RouterBook
