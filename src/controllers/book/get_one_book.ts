import { getOneBook as getOneBookService } from '../../services/book/get_one_book'
import { Request, Response } from 'express'
import { HttpCodes } from '../../types'

export const getOneBook = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const book = await getOneBookService(Number(id))

    return res.status(HttpCodes.OK).json(book)
  } catch (e) {
    if (!(e instanceof Error)) return
    return res.status(HttpCodes.SERVER_ERROR).json({ error: e.message })
  }
}
