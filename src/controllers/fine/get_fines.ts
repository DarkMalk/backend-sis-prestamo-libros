import { Request, Response } from 'express'
import { HttpCodes, UserPayload } from '../../types'
import { getAllFines } from '../../services/fine/get_all_fine'

export const getFines = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload

  // TODO: Si es cliente debe traer solo sus deudas (fines)
  if (role !== 'admin' && role !== 'librarian') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const fines = await getAllFines()

    return res.status(HttpCodes.OK).json(fines)
  } catch (e) {
    if (e instanceof Error) {
      return res.status(HttpCodes.BAD_REQUEST).json({ message: e.message })
    }
  }
}
