import type { CollectionConfig } from 'payload'
import { canManageMedia, canReadMedia } from '../lib/cms/access'
import { CMS_COLLECTION_GROUPS } from '../lib/cms/admin'

export const Media = {
  slug: 'media',
  labels: {
    singular: '媒体素材',
    plural: '媒体素材'
  },
  admin: {
    useAsTitle: 'filename',
    group: CMS_COLLECTION_GROUPS.content,
    defaultColumns: ['filename', 'albumCategory', 'relatedActivity', 'visibility', 'updatedAt'],
    description: '公开图片、视频和档案素材库，供内容发布与活动资料复用。'
  },
  access: {
    read: canReadMedia,
    create: canManageMedia,
    update: canManageMedia,
    delete: canManageMedia
  },
  upload: {
    adminThumbnail: 'thumbnail',
    bulkUpload: true,
    displayPreview: true,
    focalPoint: true,
    staticDir: 'uploads',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 480,
        height: 320,
        position: 'centre'
      },
      {
        name: 'card',
        width: 960,
        height: 640,
        position: 'centre'
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre'
      }
    ],
    mimeTypes: ['image/*', 'video/*']
  },
  fields: [
    {
      name: 'albumCategory',
      label: '相册分类',
      type: 'select',
      options: [
        { label: '戈壁挑战赛 / Ultra Gobi', value: 'gobi' },
        { label: '课堂与校园', value: 'campus' },
        { label: '企业参访 / 游学', value: 'visit' },
        { label: '宴会聚会', value: 'banquet' },
        { label: '读书分享', value: 'reading' },
        { label: '人物合影', value: 'people' },
        { label: '其他素材', value: 'other' }
      ],
      index: true,
      admin: {
        description: '用于素材库筛选和整理。活动详情中的相册条目仍可单独选择这些素材。'
      }
    },
    {
      name: 'relatedActivity',
      label: '关联活动',
      type: 'relationship',
      relationTo: 'activities',
      index: true,
      admin: {
        description: '可选。把素材挂到某一次活动，后续编辑活动相册时更容易查找。'
      }
    },
    {
      name: 'keywords',
      label: '素材关键词',
      type: 'text',
      admin: {
        description: '例如：合影、课堂、晚宴、深圳、戈壁。用于后台检索和人工整理。'
      }
    },
    {
      name: 'visibility',
      label: '公开可见性',
      type: 'select',
      defaultValue: 'private',
      options: [
        { label: '仅后台可见', value: 'private' },
        { label: '允许公开读取', value: 'public' }
      ],
      required: true,
      index: true,
      admin: {
        description: '只有设为“允许公开读取”的素材才会通过公开 API 暴露。草稿活动素材建议保持仅后台可见。'
      }
    },
    {
      name: 'alt',
      label: '替代文本',
      type: 'text',
      admin: {
        description: '可后补。简短描述图片或视频封面内容，用于无障碍阅读和素材识别。'
      }
    },
    {
      name: 'caption',
      label: '说明文字',
      type: 'textarea'
    },
    {
      name: 'source',
      label: '来源 / 署名',
      type: 'text',
      admin: {
        description: '记录摄影师、供稿人、机构、公众号或档案来源。'
      }
    },
    {
      name: 'previewFocus',
      label: '预览焦点',
      type: 'group',
      admin: {
        description: '为首页卡片、活动封面和后续视频封面裁切预留焦点。'
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'x',
              label: '水平焦点 (%)',
              type: 'number',
              defaultValue: 50,
              min: 0,
              max: 100,
              admin: {
                step: 1,
                width: '50%'
              }
            },
            {
              name: 'y',
              label: '垂直焦点 (%)',
              type: 'number',
              defaultValue: 50,
              min: 0,
              max: 100,
              admin: {
                step: 1,
                width: '50%'
              }
            }
          ]
        }
      ]
    },
    {
      name: 'rights',
      label: '版权与授权',
      type: 'group',
      fields: [
        {
          name: 'copyright',
          label: '版权说明',
          type: 'text'
        },
        {
          name: 'license',
          label: '授权类型',
          type: 'select',
          defaultValue: 'unknown',
          options: [
            { label: '未知 / 待确认', value: 'unknown' },
            { label: 'EMBA 档案馆自有', value: 'owned' },
            { label: '已获授权', value: 'licensed' },
            { label: '公共领域', value: 'publicDomain' },
            { label: '知识共享协议', value: 'creativeCommons' }
          ]
        },
        {
          name: 'sourceUrl',
          label: '来源链接',
          type: 'text'
        }
      ]
    }
  ]
} satisfies CollectionConfig
