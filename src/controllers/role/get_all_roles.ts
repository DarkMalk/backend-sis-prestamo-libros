import { Request, Response } from 'express'
import { getAllRolesFromDB } from '../../services/role/get_all_roles'
import { HttpCodes, UserPayload } from '../../types'

const getAllRoles = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload

  if (role === 'client') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const data = await getAllRolesFromDB()
    if (!data.length) {
      return res.status(HttpCodes.NOT_FOUND).json({ message: 'Roles not found' })
    }

    return res.status(HttpCodes.OK).json(data)
  } catch (e) {
    if (!(e instanceof Error)) return
    return res.status(HttpCodes.SERVER_ERROR).json({ message: e.message })
  }
}

export default getAllRoles
