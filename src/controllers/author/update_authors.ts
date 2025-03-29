import { Request, Response } from 'express'
import { HttpCodes, UserPayload } from '../../types'
import { validateReqAuthor } from '../../utils/author/validateReqAuthor'
import { updateAuthor } from '../../services/author/update_author'
import { IAuthor } from '../../models/author/Author'
import { getOneAuthor } from '../../services/author/get_one_author'

export const updateAuthors = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload
  const { id } = req.params

  if (role !== 'librarian') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const { name, nationality } = validateReqAuthor(req.body)
    const numberId = Number(id)

    const { affectedRows } = await updateAuthor({ id: numberId, name, nationality } as IAuthor)

    if (!affectedRows) {
      return res.status(HttpCodes.BAD_REQUEST).json({ message: 'Author not updated' })
    }

    const updatedAuthor = await getOneAuthor(numberId)

    return res.status(HttpCodes.OK).json(updatedAuthor)
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
      return res.status(HttpCodes.BAD_REQUEST).json({ message: e.message })
    }
  }
}
