import { Request, Response } from 'express'
import { HttpCodes, UserPayload } from '../../types'
import { getAllFines } from '../../services/fine/get_all_fine'
import { RDFine } from '../../models/fine/Fine'
import { getAllFinesByUserId } from '../../services/fine/get_all_fines_by_id_user'

export const getFines = async (req: Request, res: Response) => {
  const { role, id } = req.body.user as UserPayload
  let fines: RDFine[] = []

  try {
    if (role === 'client') {
      fines = await getAllFinesByUserId(id)
    } else {
      fines = await getAllFines()
    }

    return res.status(HttpCodes.OK).json(fines)
  } catch (e) {
    if (e instanceof Error) {
      return res.status(HttpCodes.BAD_REQUEST).json({ message: e.message })
    }
  }
}
