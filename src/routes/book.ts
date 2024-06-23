import { postNewBookInfo } from '../controllers/book/post_new_book_info'
import { getBooksInfo } from '../controllers/book/get_books_info'
import { postNewBook } from '../controllers/book/post_new_book'
import { getBooks } from '../controllers/book/get_books'
import { Router } from 'express'
import { authenticate } from '../middlewares'

// /api/book
const RouterBook = Router()

RouterBook.get('/', getBooks)
RouterBook.get('/:id', getBooksInfo)
RouterBook.post('/', authenticate, postNewBook)
RouterBook.post('/:id', authenticate, postNewBookInfo)

export default RouterBook
