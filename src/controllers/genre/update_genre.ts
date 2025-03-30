import { updateGenre as updateGenreService } from '../../services/genre/update_genre'
import { validateReqGenre } from '../../utils/genre/validate_req_genre'
import { getOneGenre } from '../../services/genre/get_one_genre'
import { HttpCodes, UserPayload } from '../../types'
import { Request, Response } from 'express'

export const updateGenre = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload
  const { id } = req.params

  if (role !== 'librarian') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const { name } = validateReqGenre(req.body)

    const { affectedRows } = await updateGenreService(Number(id), name)

    if (!affectedRows) {
      return res.status(HttpCodes.NOT_FOUND).json({ message: 'Genre not found' })
    }

    const genre = await getOneGenre(Number(id))

    return res.status(HttpCodes.OK).json(genre)
  } catch (e) {
    if (!(e instanceof Error)) return
    return res.status(HttpCodes.SERVER_ERROR).json({ message: e.message })
  }
}
