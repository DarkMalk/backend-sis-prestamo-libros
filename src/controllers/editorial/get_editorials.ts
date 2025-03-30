import { getAllEditorials } from '../../services/editorial/get_all_editorials'
import { Request, Response } from 'express'
import { HttpCodes } from '../../types'

export const getEditorials = async (_: Request, res: Response) => {
  try {
    const editorials = await getAllEditorials()

    return res.status(HttpCodes.OK).json(editorials)
  } catch (e) {
    if (!(e instanceof Error)) return
    return res.status(HttpCodes.SERVER_ERROR).json({ message: e.message })
  }
}
