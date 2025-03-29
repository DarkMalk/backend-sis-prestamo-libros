import { validateReqGenre } from '../../utils/genre/validate_req_genre'
import { newGenre } from '../../services/genre/new_genre'
import { Request, Response } from 'express'
import { HttpCodes, UserPayload } from '../../types'
import { getOneGenre } from '../../services/genre/get_one_genre'

export const postNewGenre = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload
  if (role !== 'librarian') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const { name } = validateReqGenre(req.body)
    const { insertId } = await newGenre({ name })

    const getNewGenre = await getOneGenre(insertId)

    return res.status(HttpCodes.CREATED).json(getNewGenre)
  } catch (e) {
    if (e instanceof Error) {
      return res.status(HttpCodes.BAD_REQUEST).json({ message: e.message })
    }
  }
}
