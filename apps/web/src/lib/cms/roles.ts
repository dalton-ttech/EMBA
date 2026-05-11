export const USER_ROLES = ['superAdmin', 'admin', 'editor', 'materialManager', 'reviewer'] as const

export type UserRole = (typeof USER_ROLES)[number]

export const ROLE_LABELS = {
  superAdmin: '超级管理员',
  admin: '管理员',
  editor: '内容编辑',
  materialManager: '素材管理员',
  reviewer: '只读审阅'
} satisfies Record<UserRole, string>

export const ROLE_OPTIONS = USER_ROLES.map((value) => ({
  label: ROLE_LABELS[value],
  value
}))

export const DEFAULT_OPERATOR_ROLE = 'editor' satisfies UserRole
export const ADMIN_PANEL_ROLES = USER_ROLES
export const USER_MANAGER_ROLES = ['superAdmin', 'admin'] as const satisfies readonly UserRole[]
export const USER_DELETE_ROLES = ['superAdmin'] as const satisfies readonly UserRole[]
export const ROLE_EDIT_ROLES = ['superAdmin', 'admin'] as const satisfies readonly UserRole[]
export const CONTENT_MANAGER_ROLES = ['superAdmin', 'admin', 'editor'] as const satisfies readonly UserRole[]
export const MEDIA_MANAGER_ROLES = [
  'superAdmin',
  'admin',
  'editor',
  'materialManager'
] as const satisfies readonly UserRole[]

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && (USER_ROLES as readonly string[]).includes(value)
}
