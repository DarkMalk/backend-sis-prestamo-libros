import { createUser } from '../../services/user/create_user'
import { validateReqRegister } from '../../utils/user'
import { HttpCodes, UserPayload } from '../../types'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { getUserByUsername } from '../../services/user/get_user'

const register = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload
  if (role === 'client') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized for this action' })
  }

  try {
    const data = validateReqRegister(req.body)
    if (role === 'librarian' && (data.role === 'admin' || data.role === 'librarian')) {
      return res
        .status(HttpCodes.UNAUTHORIZED)
        .json({ message: 'You are not authorized for create users with role admin or librarian' })
    }

    const passwordEncrypt = await bcrypt.hash(data.password, 10)
    await createUser({ ...data, password: passwordEncrypt })

    const { password, ...newUserWithoutPassword } = await getUserByUsername(data.username)

    return res.status(HttpCodes.CREATED).json(newUserWithoutPassword)
  } catch (e) {
    if (!(e instanceof Error)) return
    return res.status(HttpCodes.BAD_REQUEST).json({ message: e.message })
  }
}

export default register
