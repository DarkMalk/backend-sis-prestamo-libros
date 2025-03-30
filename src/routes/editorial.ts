import { deleteEditorial } from '../controllers/editorial/delete_editorial'
import { newEditorial } from '../controllers/editorial/post_new_editorial'
import { updateEditorial } from '../controllers/editorial/updateEditorial'
import { getEditorials } from '../controllers/editorial/get_editorials'
import { getEditorial } from '../controllers/editorial/get_editorial'
import { authenticate } from '../middlewares'
import { Router } from 'express'

const RouterEditorial = Router()

RouterEditorial.get('/', getEditorials)
RouterEditorial.get('/:id', getEditorial)
RouterEditorial.delete('/:id', authenticate, deleteEditorial)
RouterEditorial.post('/', authenticate, newEditorial)
RouterEditorial.put('/:id', authenticate, updateEditorial)

export { RouterEditorial }
