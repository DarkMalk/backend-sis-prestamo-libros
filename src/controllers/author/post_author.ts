import { Request, Response } from 'express'
import { HttpCodes, UserPayload } from '../../types'
import { validateReqAuthor } from '../../utils/author/validateReqAuthor'
import { postNewAuthor } from '../../services/author/post_new_author'
import { getOneAuthor } from '../../services/author/get_one_author'

export const postAuthor = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload

  if (role !== 'librarian') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const { name, nationality } = validateReqAuthor(req.body)
    const { insertId } = await postNewAuthor({ name, nationality })

    const newAuthor = await getOneAuthor(insertId)

    res.status(HttpCodes.CREATED).json(newAuthor)
  } catch (e) {
    if (e instanceof Error) {
      res.status(HttpCodes.BAD_REQUEST).json({ message: e.message })
    }
  }
}
