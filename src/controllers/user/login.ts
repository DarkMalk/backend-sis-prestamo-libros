import { getUserByUsername } from '../../services/user/get_user'
import { validateReqLogin } from '../../utils/user'
import { jwtSecret } from '../../config/guard_env'
import { Request, Response } from 'express'
import { HttpCodes } from '../../types'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const login = async (req: Request, res: Response) => {
  try {
    const data = validateReqLogin(req.body)

    const { password, ...restUser } = await getUserByUsername(data.username)

    const compare = await bcrypt.compare(data.password, password)
    if (!compare) {
      return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Invalid username or password' })
    }

    const token = jwt.sign(
      {
        id: restUser.id,
        username: restUser.username,
        role: restUser.role
      },
      jwtSecret,
      { expiresIn: '1h' }
    )

    return res.status(HttpCodes.OK).json({ token, ...restUser })
  } catch (e) {
    if (!(e instanceof Error)) return
    return res.status(HttpCodes.BAD_REQUEST).json({ message: e.message })
  }
}

export default login
