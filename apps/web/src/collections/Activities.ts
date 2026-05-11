import type { CollectionConfig } from 'payload'
import { canManageContent, canReadPublishedContent } from '../lib/cms/access'
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

export const Activities = {
  slug: 'activities',
  labels: {
    singular: '活动纪要',
    plural: '活动纪要'
  },
  admin: {
    useAsTitle: 'title',
    group: CMS_COLLECTION_GROUPS.content,
    defaultColumns: ['title', 'eventDate', 'year', 'status', 'featured'],
    description: '像填写公众号推文一样，按固定模板整理活动标题、时间地点、正文、嘉宾、图集、视频和延伸阅读。'
  },
  access: {
    read: canReadPublishedContent,
    create: canManageContent,
    update: canManageContent,
    delete: canManageContent
  },
  defaultSort: '-eventDate',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: '基础信息',
          fields: [
            {
              name: 'title',
              label: '活动标题',
              type: 'text',
              required: true,
              admin: {
                description: '用于列表、详情页和后台检索，建议与公众号标题保持一致。'
              }
            },
            {
              name: 'slug',
              label: '页面地址 Slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              admin: {
                description: '手动填写唯一英文地址，例如 alumni-salon-2026-04。'
              }
            },
            {
              name: 'summary',
              label: '活动摘要',
              type: 'textarea',
              required: true,
              admin: {
                description: '用于列表卡片和详情页导语，建议 80-150 字。'
              }
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'activityType',
                  label: '活动类型',
                  type: 'select',
                  defaultValue: 'classEvent',
                  options: [
                    { label: '班级活动', value: 'classEvent' },
                    { label: '主题沙龙', value: 'salon' },
                    { label: '企业参访', value: 'companyVisit' },
                    { label: '课程学习', value: 'course' },
                    { label: '同学分享', value: 'sharing' },
                    { label: '其他', value: 'other' }
                  ],
                  admin: {
                    width: '50%'
                  }
                },
                {
                  name: 'theme',
                  label: '活动主题',
                  type: 'text',
                  admin: {
                    description: '活动主线或栏目名称，例如“产业参访”“同学分享会”。',
                    width: '50%'
                  }
                }
              ]
            }
          ]
        },
        {
          label: '专题呈现',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'subtitle',
                  label: '详情页导语',
                  type: 'textarea',
                  admin: {
                    description: '用于活动详情页大标题下方；不填写时使用活动摘要。',
                    width: '50%'
                  }
                },
                {
                  name: 'albumCategory',
                  label: '相册分类',
                  type: 'text',
                  admin: {
                    description: '用于相册页聚合，例如：戈壁挑战赛 / Ultra Gobi。',
                    width: '50%'
                  }
                }
              ]
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'archiveNumber',
                  label: '档案编号',
                  type: 'text',
                  admin: {
                    description: '例如 036。为空时前台使用默认编号。',
                    width: '33%'
                  }
                },
                {
                  name: 'durationLabel',
                  label: '持续时间 / 里程',
                  type: 'text',
                  admin: {
                    description: '例如 4 日 3 夜、121 公里。',
                    width: '33%'
                  }
                },
                {
                  name: 'dossierLabel',
                  label: '卷宗标签',
                  type: 'text',
                  admin: {
                    description: '例如 Activity dossier、Ultra Gobi。',
                    width: '34%'
                  }
                }
              ]
            },
            {
              name: 'byline',
              label: '详情信息栏',
              type: 'array',
              admin: {
                description: '用于详情页 Date / Location / Participants / Editors 等信息。可少填，前台只展示有内容的项。'
              },
              fields: [
                {
                  name: 'label',
                  label: '标签',
                  type: 'text',
                  required: true
                },
                {
                  name: 'value',
                  label: '内容',
                  type: 'text',
                  required: true
                }
              ]
            },
            {
              name: 'metrics',
              label: '专题数据',
              type: 'array',
              admin: {
                description: '用于详情页数据区，例如 121 公里、¥1.33M、35 人。为空时前台用照片/视频/链接等基础统计。'
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'value',
                      label: '数值',
                      type: 'text',
                      required: true,
                      admin: {
                        width: '33%'
                      }
                    },
                    {
                      name: 'suffix',
                      label: '单位 / 后缀',
                      type: 'text',
                      admin: {
                        width: '33%'
                      }
                    },
                    {
                      name: 'label',
                      label: '标题',
                      type: 'text',
                      required: true,
                      admin: {
                        width: '34%'
                      }
                    }
                  ]
                },
                {
                  name: 'description',
                  label: '说明',
                  type: 'text'
                }
              ]
            },
            {
              name: 'timeline',
              label: '时间线',
              type: 'array',
              admin: {
                description: '用于详情页时间线。为空时整个时间线区块不展示。'
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'time',
                      label: '时间',
                      type: 'text',
                      admin: {
                        width: '25%'
                      }
                    },
                    {
                      name: 'dateLabel',
                      label: '日期标签',
                      type: 'text',
                      admin: {
                        width: '25%'
                      }
                    },
                    {
                      name: 'title',
                      label: '标题',
                      type: 'text',
                      admin: {
                        width: '25%'
                      }
                    },
                    {
                      name: 'value',
                      label: '强调值',
                      type: 'text',
                      admin: {
                        width: '25%'
                      }
                    }
                  ]
                },
                {
                  name: 'description',
                  label: '说明',
                  type: 'textarea',
                  required: true
                }
              ]
            },
            {
              name: 'richBody',
              label: '结构化正文',
              type: 'array',
              admin: {
                description: '用于还原 claudework 长文章正文。为空时使用上方富文本正文和摘要。'
              },
              fields: [
                {
                  name: 'blockType',
                  label: '块类型',
                  type: 'select',
                  defaultValue: 'paragraph',
                  required: true,
                  options: [
                    { label: '段落', value: 'paragraph' },
                    { label: '标题', value: 'heading' },
                    { label: '引用', value: 'quote' },
                    { label: '图片', value: 'figure' },
                    { label: '有序列表', value: 'orderedList' }
                  ]
                },
                {
                  name: 'text',
                  label: '文字',
                  type: 'textarea'
                },
                {
                  name: 'level',
                  label: '标题级别',
                  type: 'select',
                  defaultValue: '2',
                  options: [
                    { label: '二级标题', value: '2' },
                    { label: '三级标题', value: '3' }
                  ]
                },
                {
                  name: 'attribution',
                  label: '引用署名',
                  type: 'text'
                },
                {
                  name: 'image',
                  label: '图片',
                  type: 'upload',
                  relationTo: 'media'
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'number',
                      label: '图片编号',
                      type: 'text',
                      admin: {
                        width: '33%'
                      }
                    },
                    {
                      name: 'tone',
                      label: '色调编号',
                      type: 'number',
                      min: 1,
                      max: 8,
                      admin: {
                        width: '33%'
                      }
                    },
                    {
                      name: 'credit',
                      label: '图片来源',
                      type: 'text',
                      admin: {
                        width: '34%'
                      }
                    }
                  ]
                },
                {
                  name: 'caption',
                  label: '图片说明',
                  type: 'text'
                },
                {
                  name: 'items',
                  label: '列表项',
                  type: 'array',
                  fields: [
                    {
                      name: 'item',
                      label: '内容',
                      type: 'text',
                      required: true
                    }
                  ]
                }
              ]
            },
            {
              name: 'photoStrip',
              label: '精选影像',
              type: 'group',
              admin: {
                description: '手动指定详情页精选影像。为空时前台自动使用活动图集前 4 张。'
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'title',
                      label: '标题',
                      type: 'text',
                      admin: {
                        width: '34%'
                      }
                    },
                    {
                      name: 'totalLabel',
                      label: '链接文案',
                      type: 'text',
                      admin: {
                        width: '33%'
                      }
                    },
                    {
                      name: 'href',
                      label: '链接地址',
                      type: 'text',
                      admin: {
                        width: '33%'
                      }
                    }
                  ]
                },
                {
                  name: 'items',
                  label: '影像条目',
                  type: 'array',
                  fields: [
                    {
                      name: 'image',
                      label: '图片',
                      type: 'upload',
                      relationTo: 'media'
                    },
                    {
                      name: 'caption',
                      label: '说明',
                      type: 'text',
                      required: true
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'number',
                          label: '编号',
                          type: 'text',
                          admin: {
                            width: '50%'
                          }
                        },
                        {
                          name: 'tone',
                          label: '色调编号',
                          type: 'number',
                          min: 1,
                          max: 8,
                          admin: {
                            width: '50%'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: 'relatedActivities',
              label: '相关活动',
              type: 'relationship',
              relationTo: 'activities',
              hasMany: true,
              admin: {
                description: '用于详情页相关归档。为空时不展示相关区块。'
              }
            }
          ]
        },
        {
          label: '时间地点',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'eventDate',
                  label: '活动开始时间',
                  type: 'date',
                  required: true,
                  index: true,
                  admin: {
                    date: {
                      pickerAppearance: 'dayAndTime'
                    },
                    width: '50%'
                  }
                },
                {
                  name: 'endDate',
                  label: '活动结束时间',
                  type: 'date',
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
              type: 'row',
              fields: [
                {
                  name: 'year',
                  label: '年份',
                  type: 'number',
                  required: true,
                  index: true,
                  admin: {
                    description: '用于按年份归档，例如 2026。',
                    step: 1,
                    width: '33%'
                  }
                },
                {
                  name: 'city',
                  label: '城市 / 校区',
                  type: 'text',
                  admin: {
                    width: '33%'
                  }
                },
                {
                  name: 'venue',
                  label: '具体地点',
                  type: 'text',
                  admin: {
                    width: '34%'
                  }
                }
              ]
            },
            {
              name: 'locationNotes',
              label: '地点补充说明',
              type: 'textarea'
            }
          ]
        },
        {
          label: '人物与嘉宾',
          fields: [
            {
              name: 'hosts',
              label: '主持人 / 组织者',
              type: 'relationship',
              relationTo: 'people',
              hasMany: true
            },
            {
              name: 'speakers',
              label: '主讲嘉宾',
              type: 'relationship',
              relationTo: 'people',
              hasMany: true
            },
            {
              name: 'participants',
              label: '参与嘉宾 / 同学',
              type: 'relationship',
              relationTo: 'people',
              hasMany: true,
              admin: {
                description: '从人物库选择嘉宾、主持人或班级同学，避免重复手写姓名。'
              }
            }
          ]
        },
        {
          label: '活动纪要',
          fields: [
            {
              name: 'content',
              label: '正文 / 富文本纪要',
              type: 'richText',
              admin: {
                description: '填写活动纪要正文，可粘贴公众号式段落、标题和重点内容。'
              }
            },
            {
              name: 'agendaNotes',
              label: '流程 / 议程',
              type: 'textarea'
            },
            {
              name: 'highlights',
              label: '精彩看点',
              type: 'array',
              labels: {
                singular: '看点',
                plural: '看点'
              },
              fields: [
                {
                  name: 'title',
                  label: '看点标题',
                  type: 'text',
                  required: true
                },
                {
                  name: 'description',
                  label: '看点说明',
                  type: 'textarea'
                }
              ]
            },
            {
              name: 'outcomes',
              label: '活动成果 / 共识',
              type: 'textarea'
            },
            {
              name: 'followUps',
              label: '后续行动',
              type: 'array',
              labels: {
                singular: '行动',
                plural: '行动'
              },
              fields: [
                {
                  name: 'item',
                  label: '行动事项',
                  type: 'text',
                  required: true
                }
              ]
            },
            {
              name: 'quotes',
              label: '金句 / 引用',
              type: 'array',
              labels: {
                singular: '引用',
                plural: '引用'
              },
              fields: [
                {
                  name: 'quote',
                  label: '引用内容',
                  type: 'textarea',
                  required: true
                },
                {
                  name: 'person',
                  label: '引用人',
                  type: 'relationship',
                  relationTo: 'people'
                }
              ]
            }
          ]
        },
        {
          label: '图片与视频',
          fields: [
            {
              name: 'cover',
              label: '封面预览',
              type: 'group',
              admin: {
                description: '封面图用于首页推荐、活动卡片、详情页头图和分享预览。'
              },
              fields: [
                {
                  name: 'image',
                  label: '封面图',
                  type: 'upload',
                  relationTo: 'media'
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'displayIntent',
                      label: '展示用途',
                      type: 'select',
                      defaultValue: 'archiveCard',
                      options: [
                        { label: '活动卡片', value: 'archiveCard' },
                        { label: '详情页头图', value: 'detailHero' },
                        { label: '社交分享图', value: 'socialPreview' },
                        { label: '仅编辑参考', value: 'editorialReference' }
                      ],
                      admin: {
                        width: '50%'
                      }
                    },
                    {
                      name: 'cropNote',
                      label: '裁切 / 焦点说明',
                      type: 'text',
                      admin: {
                        width: '50%'
                      }
                    }
                  ]
                },
                {
                  name: 'caption',
                  label: '封面说明',
                  type: 'text'
                },
                {
                  name: 'credit',
                  label: '封面来源 / 署名',
                  type: 'text'
                },
                {
                  name: 'rightsNote',
                  label: '封面版权备注',
                  type: 'textarea'
                }
              ]
            },
            {
              name: 'gallery',
              label: '活动图集',
              type: 'array',
              labels: {
                singular: '图片',
                plural: '图片'
              },
              fields: [
                {
                  name: 'image',
                  label: '图片',
                  type: 'upload',
                  relationTo: 'media',
                  required: true
                },
                {
                  name: 'caption',
                  label: '图片说明',
                  type: 'text'
                }
              ]
            },
            {
              name: 'videos',
              label: '活动视频',
              type: 'relationship',
              relationTo: 'external-videos',
              hasMany: true,
              admin: {
                description: '选择已登记的外站视频素材，前台可展示视频封面和跳转链接。'
              }
            }
          ]
        },
        {
          label: '发布与扩展',
          fields: [
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
                    description: '只有“已发布”的活动纪要会被前台公开读取。',
                    width: '50%'
                  }
                },
                {
                  name: 'featured',
                  label: '首页推荐',
                  type: 'checkbox',
                  defaultValue: false,
                  admin: {
                    width: '50%'
                  }
                }
              ]
            },
            {
              name: 'publishedAt',
              label: '发布时间',
              type: 'date',
              index: true,
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime'
                }
              }
            },
            {
              name: 'reviewNotes',
              label: '审核备注',
              type: 'textarea',
              admin: {
                description: '供后台协作使用，不建议写入对外公开内容。'
              }
            },
            {
              name: 'tags',
              label: '标签 / 主题',
              type: 'array',
              labels: {
                singular: '标签',
                plural: '标签'
              },
              fields: [
                {
                  name: 'label',
                  label: '标签名称',
                  type: 'text',
                  required: true
                }
              ]
            },
            {
              name: 'relatedLinks',
              label: '延伸阅读 / 公众号链接',
              type: 'array',
              labels: {
                singular: '链接',
                plural: '链接'
              },
              fields: [
                {
                  name: 'title',
                  label: '链接标题',
                  type: 'text',
                  required: true
                },
                {
                  name: 'url',
                  label: '链接地址',
                  type: 'text',
                  required: true,
                  validate: validateOptionalHttpUrl
                },
                {
                  name: 'source',
                  label: '来源',
                  type: 'text'
                }
              ]
            },
            {
              name: 'seo',
              label: '搜索与分享',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  label: 'SEO 标题',
                  type: 'text'
                },
                {
                  name: 'description',
                  label: 'SEO 描述',
                  type: 'textarea'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
} satisfies CollectionConfig
