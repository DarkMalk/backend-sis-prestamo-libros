import { deleteAuthor as deleteAuthorService } from '../../services/author/delete_author'
import { HttpCodes, UserPayload } from '../../types'
import { Request, Response } from 'express'

export const deleteAuthor = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload
  const { id } = req.params

  if (role !== 'librarian') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const { affectedRows } = await deleteAuthorService(Number(id))

    if (!affectedRows) {
      return res.status(HttpCodes.NOT_FOUND).json({ message: 'Author not found' })
    }

    return res.status(HttpCodes.NO_CONTENT).end()
  } catch (e) {
    if (!(e instanceof Error)) return
    return res.status(HttpCodes.SERVER_ERROR).json({ message: e.message })
  }
}
