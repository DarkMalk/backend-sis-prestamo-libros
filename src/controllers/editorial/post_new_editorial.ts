import { newEditorial as newEditorialService } from '../../services/editorial/new_editorial'
import { validateEditorial } from '../../utils/editorial/validate_req_editorial'
import { getEditorialById } from '../../services/editorial/get_editorial_by_id'
import { HttpCodes, UserPayload } from '../../types'
import { Request, Response } from 'express'

export const newEditorial = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload

  if (role !== 'librarian') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const { name } = validateEditorial(req.body)

    const { insertId } = await newEditorialService({ name })

    if (!insertId) {
      return res.status(HttpCodes.BAD_REQUEST).json({ message: 'Error creating editorial' })
    }

    const editorial = await getEditorialById(insertId)

    return res.status(HttpCodes.CREATED).json(editorial)
  } catch (e) {
    if (e instanceof Error) {
      return res.status(HttpCodes.BAD_REQUEST).json({ message: e.message })
    }
  }
}
