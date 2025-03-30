import { Request, Response } from 'express'
import { HttpCodes } from '../../types'
import { getEditorialById } from '../../services/editorial/get_editorial_by_id'

export const getEditorial = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const editorial = await getEditorialById(Number(id))

    return res.status(HttpCodes.OK).json(editorial)
  } catch (e) {
    if (!(e instanceof Error)) return
    return res.status(HttpCodes.SERVER_ERROR).json({ message: e.message })
  }
}
