import { conn } from '../../config/db'
import { IRole } from '../../models/role/Role'
import { query } from '../../utils/roles/querys'

const getOneRoleFromDB = async (id: number) => {
  const [result] = await conn.query<IRole[]>(query.getOneRole, [id])
  const [role] = result

  if (!role) {
    throw new Error('Role not found')
  }

  return role
}

export { getOneRoleFromDB }
