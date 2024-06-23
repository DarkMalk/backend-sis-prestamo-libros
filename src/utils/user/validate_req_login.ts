type ReqLogin = {
  username: string | undefined
  password: string | undefined
}

const validateReqLogin = ({ username, password }: ReqLogin) => {
  if (!username || !password) {
    throw new Error('Username and password are required')
  }
  return { username, password }
}

export default validateReqLogin
