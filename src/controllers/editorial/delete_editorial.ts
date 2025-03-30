import { deleteEditorial as deleteEditorialService } from '../../services/editorial/delete_editorial'
import { HttpCodes, UserPayload } from '../../types'
import { Request, Response } from 'express'

export const deleteEditorial = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload
  const { id } = req.params

  if (role !== 'librarian') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const { affectedRows } = await deleteEditorialService(Number(id))

    if (!affectedRows) {
      return res.status(HttpCodes.NOT_FOUND).json({ message: 'Editorial not found' })
    }

    return res.status(HttpCodes.NO_CONTENT).end()
  } catch (e) {
    if (!(e instanceof Error)) return
    return res.status(HttpCodes.SERVER_ERROR).json({ message: e.message })
  }
}
