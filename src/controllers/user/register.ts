import { createUser } from '../../services/user/create_user'
import { validateReqRegister } from '../../utils/user'
import { HttpCodes, UserPayload } from '../../types'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { getUserByUsername } from '../../services/user/get_user'

const register = async (req: Request, res: Response) => {
  const { role } = req.body.user as UserPayload
  // TODO: Si es un usuario cliente, debe poder registrarse unicamente con el rol 'client'
  if (role === 'client') {
    return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Unauthorized for this action' })
  }

  try {
    const data = validateReqRegister(req.body)

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
