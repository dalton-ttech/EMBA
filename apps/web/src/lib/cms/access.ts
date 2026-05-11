import type { CollectionConfig, FieldAccess, GlobalConfig, Where } from 'payload'
import {
  ADMIN_PANEL_ROLES,
  CONTENT_MANAGER_ROLES,
  MEDIA_MANAGER_ROLES,
  ROLE_EDIT_ROLES,
  USER_DELETE_ROLES,
  USER_MANAGER_ROLES,
  isUserRole,
  type UserRole
} from './roles'

type CollectionAccess = NonNullable<CollectionConfig['access']>
type CollectionAccessFunction = NonNullable<CollectionAccess['read']>
type AdminAccessFunction = NonNullable<CollectionAccess['admin']>
type GlobalAccess = NonNullable<GlobalConfig['access']>
type GlobalAccessFunction = NonNullable<GlobalAccess['read']>
type AccessRequest = Parameters<CollectionAccessFunction>[0]['req']
type RoleSet = readonly UserRole[]
type PayloadAccessUser = {
  id?: string | number
  role?: unknown
}

const publicPeopleWhere: Where = {
  and: [{ status: { equals: 'published' } }, { isPublic: { equals: true } }]
}

function getAccessUser(user: unknown): PayloadAccessUser | null {
  return typeof user === 'object' && user !== null ? (user as PayloadAccessUser) : null
}

export function getUserRole(user: unknown): UserRole | undefined {
  const role = getAccessUser(user)?.role

  return isUserRole(role) ? role : undefined
}

function getUserId(user: unknown): string | number | undefined {
  return getAccessUser(user)?.id
}

export function hasAnyRole(user: unknown, roles: RoleSet): boolean {
  const role = getUserRole(user)

  return role ? roles.includes(role) : false
}

function selfWhere(user: unknown) {
  const id = getUserId(user)

  return id ? { id: { equals: id } } : false
}

async function isFirstUserBootstrap(req: AccessRequest) {
  if (req.user) {
    return false
  }

  const { totalDocs } = await req.payload.count({
    collection: 'users',
    overrideAccess: true
  })

  return totalDocs === 0
}

function canManageUsers(user: unknown): boolean {
  return hasAnyRole(user, USER_MANAGER_ROLES)
}

export const canAccessAdmin: AdminAccessFunction = ({ req }) =>
  hasAnyRole(req.user, ADMIN_PANEL_ROLES)

export const canCreateFirstUserOrManageUsers: CollectionAccessFunction = async ({ req }) =>
  canManageUsers(req.user) || isFirstUserBootstrap(req)

export const canReadUsers: CollectionAccessFunction = ({ req }) =>
  canManageUsers(req.user) || selfWhere(req.user)

export const canUpdateUsers: CollectionAccessFunction = ({ req }) =>
  canManageUsers(req.user) || selfWhere(req.user)

export const canDeleteUsers: CollectionAccessFunction = ({ req }) =>
  hasAnyRole(req.user, USER_DELETE_ROLES)

export const canSetUserRole: FieldAccess = async ({ req }) =>
  hasAnyRole(req.user, ROLE_EDIT_ROLES) || isFirstUserBootstrap(req)

export const canReadMedia: CollectionAccessFunction = ({ req }) =>
  hasAnyRole(req.user, ADMIN_PANEL_ROLES) || { visibility: { equals: 'public' } }

export const canManageMedia: CollectionAccessFunction = ({ req }) =>
  hasAnyRole(req.user, MEDIA_MANAGER_ROLES)

export const canReadPublishedContent: CollectionAccessFunction = ({ req }) =>
  hasAnyRole(req.user, ADMIN_PANEL_ROLES) || { status: { equals: 'published' } }

export const canReadPublicPeople: CollectionAccessFunction = ({ req }) =>
  hasAnyRole(req.user, ADMIN_PANEL_ROLES) || publicPeopleWhere

export const canManageContent: CollectionAccessFunction = ({ req }) =>
  hasAnyRole(req.user, CONTENT_MANAGER_ROLES)

export const canReadAdminOnly: FieldAccess = ({ req }) =>
  hasAnyRole(req.user, ADMIN_PANEL_ROLES)

export const canReadPublicGlobal: GlobalAccessFunction = () => true

export const canManageGlobal: GlobalAccessFunction = ({ req }) =>
  hasAnyRole(req.user, CONTENT_MANAGER_ROLES)
