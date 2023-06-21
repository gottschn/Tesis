import { PermissionProps } from '../@redux/Auth/types'

export interface UserInit {
  username: string
  password: string
}

export interface UserResult {
  userId: string
  office: string | null
  firstName: string
  lastName: string
  permissions: PermissionProps[]
}

