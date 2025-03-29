import { conn } from '../../config/db'
import { IRole } from '../../models/role/Role'
import { query } from '../../utils/roles/querys'

const getAllRolesFromDB = async () => {
  const [roles] = await conn.query<IRole[]>(query.getAllRoles)

  return roles
}

export { getAllRolesFromDB }
