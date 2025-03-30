import { updateEditorial as updateEditorialService } from '../../services/editorial/update_editorial'
import { validateEditorial } from '../../utils/editorial/validate_req_editorial'
import { getEditorialById } from '../../services/editorial/get_editorial_by_id'
import { HttpCodes, UserPayload } from '../../types'
import { Request, Response } from 'express'

export const updateEditorial = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload
  const { id: idString } = req.params

  if (role !== 'librarian') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const id = Number(idString)
    const { name } = validateEditorial(req.body)

    const { affectedRows } = await updateEditorialService({ id, name })

    if (!affectedRows) {
      return res.status(HttpCodes.NOT_FOUND).json({ message: 'Editorial not found' })
    }

    const editorial = await getEditorialById(id)

    return res.status(HttpCodes.OK).json(editorial)
  } catch (e) {
    if (!(e instanceof Error)) return
    return res.status(HttpCodes.SERVER_ERROR).json({ message: e.message })
  }
}
