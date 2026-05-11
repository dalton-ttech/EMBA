import type { GlobalConfig } from 'payload'
import {
  canManageGlobal,
  canReadAdminOnly,
  canReadPublicGlobal
} from '../lib/cms/access'
import { CMS_COLLECTION_GROUPS } from '../lib/cms/admin'

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

export const SiteSettings = {
  slug: 'site-settings',
  label: '站点设置',
  admin: {
    group: CMS_COLLECTION_GROUPS.settings,
    description: '统一管理首页推荐、班级介绍、联系方式与默认 SEO。'
  },
  access: {
    read: canReadPublicGlobal,
    update: canManageGlobal
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '首页推荐',
          fields: [
            {
              name: 'homeEyebrow',
              label: '首页眉题',
              type: 'text',
              defaultValue: 'EMBA Class Archive'
            },
            {
              name: 'homeTitle',
              label: '首页标题',
              type: 'text',
              required: true
            },
            {
              name: 'homeSummary',
              label: '首页摘要',
              type: 'textarea',
              required: true
            },
            {
              name: 'homeStats',
              label: '首页信号',
              type: 'array',
              labels: {
                singular: '信号',
                plural: '首页信号'
              },
              fields: [
                {
                  name: 'value',
                  label: '数值 / 短语',
                  type: 'text',
                  required: true
                },
                {
                  name: 'label',
                  label: '说明',
                  type: 'text',
                  required: true
                }
              ]
            },
            {
              name: 'featuredActivities',
              label: '首页推荐活动',
              type: 'relationship',
              relationTo: 'activities',
              hasMany: true
            },
            {
              name: 'featuredPeople',
              label: '首页推荐人物',
              type: 'relationship',
              relationTo: 'people',
              hasMany: true
            }
          ]
        },
        {
          label: '班级介绍',
          fields: [
            {
              name: 'className',
              label: '班级名称',
              type: 'text',
              required: true
            },
            {
              name: 'classSubtitle',
              label: '班级副标题',
              type: 'text'
            },
            {
              name: 'classSummary',
              label: '班级简介',
              type: 'textarea',
              required: true
            },
            {
              name: 'classHeroImage',
              label: '班级主视觉',
              type: 'upload',
              relationTo: 'media'
            },
            {
              name: 'classHighlights',
              label: '班级亮点',
              type: 'array',
              labels: {
                singular: '亮点',
                plural: '班级亮点'
              },
              fields: [
                {
                  name: 'value',
                  label: '数字 / 短语',
                  type: 'text',
                  required: true
                },
                {
                  name: 'label',
                  label: '说明',
                  type: 'text',
                  required: true
                }
              ]
            },
            {
              name: 'classSections',
              label: '班级介绍段落',
              type: 'array',
              labels: {
                singular: '段落',
                plural: '班级介绍段落'
              },
              fields: [
                {
                  name: 'heading',
                  label: '段落标题',
                  type: 'text',
                  required: true
                },
                {
                  name: 'body',
                  label: '段落正文',
                  type: 'textarea',
                  required: true
                }
              ]
            }
          ]
        },
        {
          label: '联系方式',
          fields: [
            {
              name: 'contactTitle',
              label: '联系区标题',
              type: 'text',
              required: true
            },
            {
              name: 'contactSummary',
              label: '联系区摘要',
              type: 'textarea',
              required: true
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'primaryEmail',
                  label: '主联系邮箱',
                  type: 'email',
                  required: true,
                  admin: {
                    width: '50%'
                  }
                },
                {
                  name: 'locationLabel',
                  label: '地点说明',
                  type: 'text',
                  admin: {
                    width: '50%'
                  }
                }
              ]
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'officeHours',
                  label: '联系时段',
                  type: 'text',
                  admin: {
                    width: '50%'
                  }
                },
                {
                  name: 'applyUrl',
                  label: '报名 / 咨询入口',
                  type: 'text',
                  validate: validateOptionalHttpUrl,
                  admin: {
                    width: '50%'
                  }
                }
              ]
            },
            {
              name: 'newsletterNote',
              label: '邮箱留资提示',
              type: 'textarea',
              admin: {
                description: '说明填写邮箱后的处理方式，例如“将打开邮件客户端，不会在站点直接存储”。'
              }
            },
            {
              name: 'contactChannels',
              label: '公开联系渠道',
              type: 'array',
              labels: {
                singular: '渠道',
                plural: '公开联系渠道'
              },
              fields: [
                {
                  name: 'label',
                  label: '渠道名称',
                  type: 'text',
                  required: true
                },
                {
                  name: 'value',
                  label: '显示内容',
                  type: 'text',
                  required: true
                },
                {
                  name: 'url',
                  label: '渠道链接',
                  type: 'text',
                  validate: validateOptionalHttpUrl
                }
              ]
            }
          ]
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'siteName',
              label: '站点名称',
              type: 'text',
              required: true
            },
            {
              name: 'defaultTitle',
              label: '默认标题',
              type: 'text',
              required: true
            },
            {
              name: 'defaultDescription',
              label: '默认描述',
              type: 'textarea',
              required: true
            },
            {
              name: 'keywords',
              label: '默认关键词',
              type: 'array',
              labels: {
                singular: '关键词',
                plural: '默认关键词'
              },
              fields: [
                {
                  name: 'value',
                  label: '关键词',
                  type: 'text',
                  required: true
                }
              ]
            },
            {
              name: 'defaultOgImage',
              label: '默认分享图',
              type: 'upload',
              relationTo: 'media'
            },
            {
              name: 'footerNote',
              label: '页脚说明',
              type: 'textarea'
            },
            {
              name: 'internalSeoNotes',
              label: '内部 SEO 备注',
              type: 'textarea',
              access: {
                read: canReadAdminOnly
              }
            }
          ]
        }
      ]
    }
  ]
} satisfies GlobalConfig
