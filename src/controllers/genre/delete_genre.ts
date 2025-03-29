import { deleteGenre as deleteGenreService } from '../../services/genre/delete_genre'
import { HttpCodes, UserPayload } from '../../types'
import { Request, Response } from 'express'

export const deleteGenre = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload
  const { id } = req.params

  if (role !== 'librarian') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const { affectedRows } = await deleteGenreService(Number(id))

    if (!affectedRows) {
      return res.status(HttpCodes.NOT_FOUND).json({ message: 'Genre not found' })
    }

    return res.status(HttpCodes.NO_CONTENT).end()
  } catch (e) {
    if (!(e instanceof Error)) return
    return res.status(HttpCodes.SERVER_ERROR).json({ message: e.message })
  }
}
