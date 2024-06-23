import { conn } from '../../config/db'
import { IRole } from '../../models/role/Role'
import { query } from '../../utils/querys'

const getAllRolesFromDB = async () => {
  const [roles] = await conn.query<IRole[]>(query.getAllRoles)

  return roles
}

export { getAllRolesFromDB }
