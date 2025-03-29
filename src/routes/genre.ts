import { postNewGenre } from '../controllers/genre/post_new_genre'
import { getAllGenre } from '../controllers/genre/get_all_genre'
import { Router } from 'express'
import { authenticate } from '../middlewares'
import { deleteGenre } from '../controllers/genre/delete_genre'

const RouterGenre = Router()

RouterGenre.get('/', getAllGenre)
RouterGenre.post('/', authenticate, postNewGenre)
RouterGenre.delete('/:id', authenticate, deleteGenre)

export default RouterGenre
