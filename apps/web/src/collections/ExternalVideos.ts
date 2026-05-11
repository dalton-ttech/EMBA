import type { CollectionConfig } from 'payload'
import { canManageContent, canReadPublishedContent } from '../lib/cms/access'
import { CMS_COLLECTION_GROUPS } from '../lib/cms/admin'

const statusOptions = [
  { label: '草稿', value: 'draft' },
  { label: '待审核', value: 'review' },
  { label: '已发布', value: 'published' },
  { label: '已归档', value: 'archived' }
]

const allowedVideoHosts = new Set([
  'channels.weixin.qq.com',
  'mp.weixin.qq.com',
  'v.qq.com',
  'video.qq.com',
  'www.bilibili.com',
  'bilibili.com',
  'b23.tv',
  'v.youku.com',
  'www.youku.com',
  'youku.com',
  'www.douyin.com',
  'douyin.com',
  'v.douyin.com',
  'www.youtube.com',
  'youtube.com',
  'youtu.be',
  'vimeo.com',
  'www.vimeo.com'
])

const validateExternalVideoUrl = (value: unknown) => {
  if (typeof value !== 'string' || !value || /[<>]/.test(value)) {
    return '请输入白名单视频平台的有效链接，不要粘贴 iframe 或 HTML。'
  }

  try {
    const url = new URL(value)

    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      return '视频链接必须以 http:// 或 https:// 开头。'
    }

    return allowedVideoHosts.has(url.hostname)
      ? true
      : '当前仅允许视频号、腾讯视频、B 站、优酷、抖音、YouTube 或 Vimeo 链接。'
  } catch {
    return '请输入有效的视频链接。'
  }
}

export const ExternalVideos = {
  slug: 'external-videos',
  labels: {
    singular: '外站视频',
    plural: '外站视频'
  },
  admin: {
    useAsTitle: 'title',
    group: CMS_COLLECTION_GROUPS.content,
    defaultColumns: ['title', 'provider', 'status', 'publishedAt', 'updatedAt'],
    description: '登记外站视频的结构化信息和封面预览，不保存 iframe、script 或任意 HTML。'
  },
  access: {
    read: canReadPublishedContent,
    create: canManageContent,
    update: canManageContent,
    delete: canManageContent
  },
  defaultSort: '-publishedAt',
  fields: [
    {
      name: 'title',
      label: '视频标题',
      type: 'text',
      required: true
    },
    {
      type: 'row',
      fields: [
        {
          name: 'provider',
          label: '来源平台',
          type: 'select',
          defaultValue: 'wechatChannels',
          required: true,
          options: [
            { label: '视频号', value: 'wechatChannels' },
            { label: '腾讯视频', value: 'tencentVideo' },
            { label: 'B 站', value: 'bilibili' },
            { label: '优酷', value: 'youku' },
            { label: '抖音', value: 'douyin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Vimeo', value: 'vimeo' },
            { label: '其他已批准平台', value: 'other' }
          ],
          admin: {
            width: '50%'
          }
        },
        {
          name: 'providerId',
          label: '平台视频 ID',
          type: 'text',
          admin: {
            description: '可选，填写平台侧视频 ID，便于后续生成预览或迁移。',
            width: '50%'
          }
        }
      ]
    },
    {
      name: 'sourceUrl',
      label: '外站视频链接',
      type: 'text',
      required: true,
      validate: validateExternalVideoUrl,
      admin: {
        description: '粘贴视频页面链接，不要粘贴 iframe、script 或任意 HTML。'
      }
    },
    {
      type: 'row',
      fields: [
        {
          name: 'duration',
          label: '时长',
          type: 'text',
          admin: {
            description: '例如 03:20 或 1:12:30。',
            width: '33%'
          }
        },
        {
          name: 'language',
          label: '语言',
          type: 'text',
          admin: {
            width: '33%'
          }
        },
        {
          name: 'captionStatus',
          label: '字幕 / 转写',
          type: 'select',
          defaultValue: 'unknown',
          options: [
            { label: '未知', value: 'unknown' },
            { label: '无字幕', value: 'none' },
            { label: '有字幕', value: 'captioned' },
            { label: '已有转写稿', value: 'transcribed' }
          ],
          admin: {
            width: '34%'
          }
        }
      ]
    },
    {
      name: 'coverImage',
      label: '封面图',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: '优先上传已确认版权的封面图，前台用它显示视频预览。'
      }
    },
    {
      name: 'coverPreviewNote',
      label: '封面预览说明',
      type: 'textarea',
      admin: {
        description: '记录封面画面重点，例如“论坛合影”“嘉宾演讲特写”。'
      }
    },
    {
      name: 'relatedActivities',
      label: '关联活动',
      type: 'relationship',
      relationTo: 'activities',
      hasMany: true
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
            description: '只有“已发布”的视频会被前台公开读取。',
            width: '50%'
          }
        },
        {
          name: 'publishedAt',
          label: '发布时间',
          type: 'date',
          index: true,
          admin: {
            date: {
              pickerAppearance: 'dayAndTime'
            },
            width: '50%'
          }
        }
      ]
    },
    {
      name: 'rightsNote',
      label: '授权 / 版权备注',
      type: 'textarea',
      admin: {
        description: '记录视频授权、来源或公开展示限制。'
      }
    },
    {
      name: 'sourceNote',
      label: '来源备注',
      type: 'textarea'
    }
  ]
} satisfies CollectionConfig
