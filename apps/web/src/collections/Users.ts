import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import {
  canAccessAdmin,
  canCreateFirstUserOrManageUsers,
  canDeleteUsers,
  canReadUsers,
  canSetUserRole,
  canUpdateUsers
} from '../lib/cms/access'
import { CMS_COLLECTION_GROUPS } from '../lib/cms/admin'
import { DEFAULT_OPERATOR_ROLE, ROLE_OPTIONS } from '../lib/cms/roles'

const forceFirstUserSuperAdmin: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req
}) => {
  if (operation !== 'create') {
    return data
  }

  const { totalDocs } = await req.payload.count({
    collection: 'users',
    overrideAccess: true
  })

  if (totalDocs === 0) {
    return {
      ...data,
      role: 'superAdmin'
    }
  }

  return data
}

export const Users = {
  slug: 'users',
  labels: {
    singular: '后台用户',
    plural: '后台用户'
  },
  admin: {
    useAsTitle: 'email',
    group: CMS_COLLECTION_GROUPS.system,
    defaultColumns: ['email', 'displayName', 'role', 'updatedAt'],
    description: '管理后台账号、角色与基础资料。'
  },
  access: {
    admin: canAccessAdmin,
    create: canCreateFirstUserOrManageUsers,
    read: canReadUsers,
    update: canUpdateUsers,
    delete: canDeleteUsers
  },
  auth: true,
  hooks: {
    beforeChange: [forceFirstUserSuperAdmin]
  },
  fields: [
    {
      name: 'role',
      label: '后台角色',
      type: 'select',
      defaultValue: DEFAULT_OPERATOR_ROLE,
      options: ROLE_OPTIONS,
      required: true,
      access: {
        create: canSetUserRole,
        update: canSetUserRole
      },
      admin: {
        description:
          '控制后台权限。超级管理员/管理员管理用户，内容编辑和素材管理员管理媒体，只读审阅用于查看资料。'
      }
    },
    {
      name: 'displayName',
      label: '显示名称',
      type: 'text',
      admin: {
        description: '用于后台列表和后续内容署名，比邮箱更便于识别。'
      }
    }
  ]
} satisfies CollectionConfig
