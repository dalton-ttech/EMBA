import type { CollectionConfig } from 'payload'
import { canManageContent, canReadAdminOnly, canReadPublicPeople } from '../lib/cms/access'
import { CMS_COLLECTION_GROUPS } from '../lib/cms/admin'

const statusOptions = [
  { label: '草稿', value: 'draft' },
  { label: '待审核', value: 'review' },
  { label: '已发布', value: 'published' },
  { label: '已归档', value: 'archived' }
]

const validateOptionalHttpUrl = (value: unknown) => {
  if (!value) {
    return true
  }

  if (typeof value !== 'string' || /[<>]/.test(value)) {
    return '请输入有效的 http 或 https 链接。'
  }

  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
      ? true
      : '链接必须以 http:// 或 https:// 开头。'
  } catch {
    return '请输入有效的 http 或 https 链接。'
  }
}

export const People = {
  slug: 'people',
  labels: {
    singular: '人物 / 嘉宾',
    plural: '人物 / 嘉宾'
  },
  admin: {
    useAsTitle: 'name',
    group: CMS_COLLECTION_GROUPS.content,
    defaultColumns: ['name', 'roleCategory', 'organization', 'status', 'isPublic'],
    description: '维护班级人物、活动嘉宾、主持人和同学资料，供活动纪要反复引用。'
  },
  access: {
    read: canReadPublicPeople,
    create: canManageContent,
    update: canManageContent,
    delete: canManageContent
  },
  defaultSort: 'sortOrder',
  fields: [
    {
      name: 'name',
      label: '姓名',
      type: 'text',
      required: true
    },
    {
      name: 'slug',
      label: '人物 Slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        description: '可选的英文唯一标识，后续公开人物页会用到。'
      }
    },
    {
      type: 'row',
      fields: [
        {
          name: 'roleCategory',
          label: '人物类型',
          type: 'select',
          defaultValue: 'guest',
          options: [
            { label: '班级同学', value: 'classmate' },
            { label: '嘉宾', value: 'guest' },
            { label: '讲师 / 教授', value: 'faculty' },
            { label: '主持人', value: 'host' },
            { label: '工作人员', value: 'staff' },
            { label: '其他', value: 'other' }
          ],
          admin: {
            width: '50%'
          }
        },
        {
          name: 'title',
          label: '身份 / 头衔',
          type: 'text',
          admin: {
            width: '50%'
          }
        }
      ]
    },
    {
      name: 'organization',
      label: '机构',
      type: 'text',
      admin: {
        description: '填写所在企业、学校、协会或项目名称。'
      }
    },
    {
      name: 'bio',
      label: '公开简介',
      type: 'textarea',
      admin: {
        description: '用于活动详情页的人物介绍，建议控制在 100 字以内。'
      }
    },
    {
      name: 'avatar',
      label: '头像',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'profileLinks',
      label: '公开资料链接',
      type: 'array',
      labels: {
        singular: '链接',
        plural: '链接'
      },
      fields: [
        {
          name: 'label',
          label: '链接名称',
          type: 'text',
          required: true
        },
        {
          name: 'url',
          label: '链接地址',
          type: 'text',
          required: true,
          validate: validateOptionalHttpUrl
        }
      ]
    },
    {
      type: 'row',
      fields: [
        {
          name: 'status',
          label: '发布状态',
          type: 'select',
          defaultValue: 'draft',
          options: statusOptions,
          required: true,
          index: true,
          admin: {
            description: '只有“已发布”且“允许公开展示”的人物会被前台公开读取。',
            width: '33%'
          }
        },
        {
          name: 'isPublic',
          label: '允许公开展示',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '33%'
          }
        },
        {
          name: 'sortOrder',
          label: '排序',
          type: 'number',
          defaultValue: 100,
          admin: {
            step: 1,
            width: '34%'
          }
        }
      ]
    },
    {
      name: 'internalNotes',
      label: '内部备注',
      type: 'textarea',
      access: {
        read: canReadAdminOnly
      },
      admin: {
        description: '仅后台可见，用于记录沟通、授权或编辑备注。'
      }
    }
  ]
} satisfies CollectionConfig
