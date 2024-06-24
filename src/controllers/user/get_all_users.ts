import { Request, Response } from 'express'
import { getAllUsers } from '../../services/user/get_all_users'
import { HttpCodes, UserPayload } from '../../types'

export const allUsers = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload

  if (role === 'client') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  }

  try {
    const users = await getAllUsers()

    return res.status(HttpCodes.OK).json(users)
  } catch (e) {
    if (e instanceof Error) {
      return res.status(HttpCodes.BAD_REQUEST).json({ message: e.message })
    }
  }
}
