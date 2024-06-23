import { Request, Response } from 'express'
import { HttpCodes, UserPayload } from '../../types'
import { getOneRoleFromDB } from '../../services/role/get_one_role'

const getOneRole = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload

  if (role === 'client') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  const { id } = req.params

  try {
    const data = await getOneRoleFromDB(Number(id))

    return res.status(HttpCodes.OK).json(data)
  } catch (e) {
    if (!(e instanceof Error)) return
    return res.status(HttpCodes.BAD_REQUEST).json({ message: e.message })
  }
}

export default getOneRole
