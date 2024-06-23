import { Request, Response } from 'express'
import { HttpCodes, UserPayload } from '../../types'
import { getOneFine } from '../../services/fine/get_one_fine'
import { updateFineStateDB } from '../../services/fine/update_fine_state'

export const updateFineState = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload

  if (role !== 'admin' && role !== 'librarian') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  const { id } = req.params
  try {
    const result = await updateFineStateDB(Number(id))
    if (!result) {
      throw new Error("Don't update fine state")
    }

    const fine = await getOneFine(Number(id))

    return res.status(HttpCodes.OK).json(fine)
  } catch (e) {
    if (e instanceof Error) {
      return res.status(HttpCodes.BAD_REQUEST).json({ error: e.message })
    }
  }
}
