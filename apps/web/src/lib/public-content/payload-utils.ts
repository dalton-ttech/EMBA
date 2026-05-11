import type {
  Activity as PayloadActivity,
  ExternalVideo as PayloadExternalVideo,
  Media as PayloadMedia,
  Person as PayloadPerson
} from '../../../payload-types'
import type {
  ActivityBodySection,
  ActivityLink,
  ActivityMedia,
  ActivityPerson,
  ActivityVideo
} from '@/types/activity'

const warnedKeys = new Set<string>()

const providerLabels: Record<PayloadExternalVideo['provider'], string> = {
  wechatChannels: '视频号',
  tencentVideo: '腾讯视频',
  bilibili: 'B 站',
  youku: '优酷',
  douyin: '抖音',
  youtube: 'YouTube',
  vimeo: 'Vimeo',
  other: '外部视频'
}

interface LexicalNode {
  type?: string
  text?: string
  children?: LexicalNode[]
}

function isPayloadMediaDocument(value: unknown): value is PayloadMedia {
  return typeof value === 'object' && value !== null && 'id' in value && 'alt' in value
}

function isPayloadPersonDocument(value: unknown): value is PayloadPerson {
  return typeof value === 'object' && value !== null && 'id' in value && 'name' in value
}

function isPayloadVideoDocument(value: unknown): value is PayloadExternalVideo {
  return typeof value === 'object' && value !== null && 'id' in value && 'sourceUrl' in value
}

function toArray<T>(value: T[] | null | undefined) {
  return value ?? []
}

function splitParagraphs(value?: string | null) {
  if (!value) {
    return []
  }

  return value
    .split(/\r?\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

function toPlainText(node: LexicalNode | null | undefined): string {
  if (!node) {
    return ''
  }

  if (typeof node.text === 'string') {
    return node.text
  }

  return (node.children ?? [])
    .map((child) => toPlainText(child))
    .join('')
    .trim()
}

function inferLinkType(url: string): ActivityLink['type'] {
  try {
    const parsed = new URL(url)

    if (parsed.hostname === 'mp.weixin.qq.com') {
      return 'wechatArticle'
    }

    if (parsed.pathname.toLowerCase().endsWith('.pdf')) {
      return 'pdf'
    }

    return 'website'
  } catch {
    return 'other'
  }
}

export function logPayloadFallback(key: string, error: unknown) {
  if (warnedKeys.has(key)) {
    return
  }

  warnedKeys.add(key)

  const message = error instanceof Error ? error.message : String(error)
  console.warn(`[public-content] falling back to fixtures for ${key}: ${message}`)
}

export function toPublicMedia(value?: number | PayloadMedia | null): ActivityMedia | undefined {
  if (!isPayloadMediaDocument(value) || value.visibility !== 'public' || !value.url) {
    return undefined
  }

  return {
    id: String(value.id),
    src: value.url,
    alt: value.alt ?? value.filename ?? 'EMBA 活动素材',
    width: value.width ?? undefined,
    height: value.height ?? undefined,
    caption: value.caption ?? undefined,
    credit: value.source ?? undefined
  }
}

export function toPublicActivityPerson(
  value?: number | PayloadPerson | null,
  fallbackRole?: string
): ActivityPerson | undefined {
  if (!isPayloadPersonDocument(value) || value.status !== 'published' || !value.isPublic) {
    return undefined
  }

  return {
    id: String(value.id),
    name: value.name,
    role: value.title ?? fallbackRole,
    affiliation: value.organization ?? undefined,
    bio: value.bio ?? undefined,
    avatar: toPublicMedia(value.avatar)
  }
}

export function toPublicVideo(value?: number | PayloadExternalVideo | null): ActivityVideo | undefined {
  if (!isPayloadVideoDocument(value) || value.status !== 'published') {
    return undefined
  }

  return {
    id: String(value.id),
    title: value.title,
    provider: value.provider,
    providerLabel: providerLabels[value.provider],
    href: value.sourceUrl,
    thumbnail: toPublicMedia(value.coverImage),
    duration: value.duration ?? undefined,
    publishedAt: value.publishedAt ? value.publishedAt.slice(0, 10) : undefined
  }
}

export function toPublicLink(
  link: NonNullable<PayloadActivity['relatedLinks']>[number],
  index: number
): ActivityLink {
  return {
    id: link.id ?? `related-link-${index}`,
    label: link.title,
    href: link.url,
    type: inferLinkType(link.url),
    source: link.source ?? undefined
  }
}

export function lexicalToSections(value?: PayloadActivity['content'] | null): ActivityBodySection[] {
  const rootChildren = value?.root?.children

  if (!Array.isArray(rootChildren) || rootChildren.length === 0) {
    return []
  }

  const sections: ActivityBodySection[] = []
  let currentSection: ActivityBodySection | null = null
  let untitledIndex = 1

  for (const node of rootChildren as LexicalNode[]) {
    if (node.type === 'heading') {
      const heading = toPlainText(node)

      if (!heading) {
        continue
      }

      currentSection = {
        id: `content-section-${sections.length + 1}`,
        heading,
        paragraphs: []
      }
      sections.push(currentSection)
      continue
    }

    const paragraph = toPlainText(node)

    if (!paragraph) {
      continue
    }

    if (!currentSection) {
      currentSection = {
        id: `content-section-${untitledIndex}`,
        heading: untitledIndex === 1 ? '活动纪要' : `补充内容 ${untitledIndex}`,
        paragraphs: []
      }
      untitledIndex += 1
      sections.push(currentSection)
    }

    currentSection.paragraphs.push(paragraph)
  }

  return sections.filter((section) => section.paragraphs.length > 0)
}

export function buildSupplementarySections(activity: PayloadActivity): ActivityBodySection[] {
  const sections: ActivityBodySection[] = []

  if (activity.agendaNotes) {
    sections.push({
      id: 'agenda-notes',
      heading: '流程与议程',
      paragraphs: splitParagraphs(activity.agendaNotes)
    })
  }

  if (toArray(activity.highlights).length > 0) {
    sections.push({
      id: 'highlights',
      heading: '精彩看点',
      paragraphs: toArray(activity.highlights)
        .map((item) => [item.title, item.description].filter(Boolean).join('：'))
        .filter(Boolean)
    })
  }

  if (activity.outcomes) {
    sections.push({
      id: 'outcomes',
      heading: '活动成果与共识',
      paragraphs: splitParagraphs(activity.outcomes)
    })
  }

  if (toArray(activity.followUps).length > 0) {
    sections.push({
      id: 'follow-ups',
      heading: '后续行动',
      paragraphs: toArray(activity.followUps)
        .map((item) => item.item)
        .filter(Boolean)
    })
  }

  if (toArray(activity.quotes).length > 0) {
    sections.push({
      id: 'quotes',
      heading: '引用与观点',
      paragraphs: toArray(activity.quotes)
        .map((item) => {
          const person = toPublicActivityPerson(item.person)
          return person ? `${item.quote} —— ${person.name}` : item.quote
        })
        .filter(Boolean)
    })
  }

  return sections.filter((section) => section.paragraphs.length > 0)
}

export function getActivityDateLabel(start: string, end?: string | null) {
  const formatter = new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

  const format = (value: string) =>
    formatter.format(new Date(`${value}T00:00:00+08:00`)).replaceAll('/', '.')

  const startLabel = format(start)

  return end ? `${startLabel} - ${format(end)}` : startLabel
}

export function getLocationLabel(city?: string | null, venue?: string | null) {
  return [city, venue].filter(Boolean).join(' 路 ')
}

export function getThemeMetadata(activity: PayloadActivity) {
  const type = activity.activityType ?? 'other'

  const themeMap = {
    classEvent: { theme: 'other' as const, label: '班级活动' },
    salon: { theme: 'salon' as const, label: '主题沙龙' },
    companyVisit: { theme: 'studyTour' as const, label: '企业参访' },
    course: { theme: 'publicClass' as const, label: '课程学习' },
    sharing: { theme: 'reunion' as const, label: '同学分享' },
    other: { theme: 'other' as const, label: '其他活动' }
  }

  const base = themeMap[type]

  return {
    theme: base.theme,
    themeLabel: activity.theme ?? base.label
  }
}

export function countUniqueMedia(items: Array<ActivityMedia | undefined>) {
  return new Set(
    items
      .filter((item): item is ActivityMedia => Boolean(item))
      .map((item) => item.id)
  ).size
}
