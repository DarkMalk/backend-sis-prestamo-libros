import { Request, Response } from 'express'
import { HttpCodes, UserPayload } from '../../types'
import { validateReqFine } from '../../utils/fine/validate_req_fine'
import { newFine } from '../../services/fine/post_new_fine'
import { postUserFine } from '../../services/fine/post_user_fine'
import { getOneFine } from '../../services/fine/get_one_fine'

export const postNewFine = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload

  if (role !== 'admin') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const { value, state, username } = validateReqFine(req.body)
    const { insertId: idFine } = await newFine({ value, state })
    await postUserFine(username, idFine)

    const fine = await getOneFine(idFine)

    return res.status(HttpCodes.OK).json(fine)
  } catch (e) {
    if (e instanceof Error) {
      return res.status(HttpCodes.BAD_REQUEST).json({ error: e.message })
    }
  }
}
