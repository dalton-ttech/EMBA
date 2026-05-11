import { cache } from 'react'
import {
  getPayloadClient,
  isPayloadDatabaseReachable
} from '@/lib/payload/get-payload-client'
import type {
  ActivityDetail,
  ActivityListItem,
  ActivityPhotoStripItem,
  ActivityRelatedArchive,
  ActivityRichBodyBlock,
  ActivityTimelineItem,
  ActivityYearGroup
} from '@/types/activity'
import { activityFixtures } from './activity-fixtures'
import {
  buildSupplementarySections,
  countUniqueMedia,
  getActivityDateLabel,
  getLocationLabel,
  getThemeMetadata,
  lexicalToSections,
  logPayloadFallback,
  toPublicActivityPerson,
  toPublicLink,
  toPublicMedia,
  toPublicVideo
} from './payload-utils'
import type { Activity as PayloadActivity, Media as PayloadMedia } from '../../../payload-types'

type ActivityFixture = (typeof activityFixtures)[number]
type PayloadMediaReference = number | PayloadMedia | null | undefined
type TopicPayloadActivity = PayloadActivity & {
  subtitle?: string | null
  albumCategory?: string | null
  archiveNumber?: string | null
  durationLabel?: string | null
  dossierLabel?: string | null
  byline?:
    | {
        id?: string | null
        label?: string | null
        value?: string | null
      }[]
    | null
  metrics?:
    | {
        id?: string | null
        value?: string | null
        suffix?: string | null
        label?: string | null
        description?: string | null
      }[]
    | null
  timeline?:
    | {
        id?: string | null
        time?: string | null
        dateLabel?: string | null
        title?: string | null
        value?: string | null
        description?: string | null
      }[]
    | null
  richBody?:
    | {
        id?: string | null
        blockType?: 'paragraph' | 'heading' | 'quote' | 'figure' | 'orderedList' | null
        text?: string | null
        level?: '2' | '3' | null
        attribution?: string | null
        image?: PayloadMediaReference
        number?: string | null
        tone?: number | null
        credit?: string | null
        caption?: string | null
        items?:
          | {
              item?: string | null
            }[]
          | null
      }[]
    | null
  photoStrip?: {
    title?: string | null
    totalLabel?: string | null
    href?: string | null
    items?:
      | {
          id?: string | null
          image?: PayloadMediaReference
          caption?: string | null
          number?: string | null
          tone?: number | null
        }[]
      | null
  } | null
  relatedActivities?: Array<number | TopicPayloadActivity> | null
}

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
})

function formatFixtureDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00+08:00`)).replaceAll('/', '.')
}

function formatFixtureDateRange(activity: ActivityFixture) {
  const start = formatFixtureDate(activity.date.start)

  return activity.date.end ? `${start} - ${formatFixtureDate(activity.date.end)}` : start
}

function formatFixtureLocation(activity: ActivityFixture) {
  return [activity.location.city, activity.location.venue].filter(Boolean).join(' · ')
}

function optionalText(value?: string | null) {
  const trimmed = value?.trim()

  return trimmed || undefined
}

function optionalNumber(value?: number | null) {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

function optionalArray<T>(items: T[]) {
  return items.length > 0 ? items : undefined
}

function toPayloadByline(activity: TopicPayloadActivity): ActivityDetail['byline'] {
  return optionalArray(
    (activity.byline ?? [])
      .map((item, index) => {
        const label = optionalText(item.label)
        const value = optionalText(item.value)

        return label && value
          ? {
              id: item.id ?? `byline-${index + 1}`,
              label,
              value
            }
          : undefined
      })
      .filter((item): item is NonNullable<ActivityDetail['byline']>[number] => Boolean(item))
  )
}

function toPayloadMetrics(activity: TopicPayloadActivity): ActivityDetail['metrics'] {
  return optionalArray(
    (activity.metrics ?? [])
      .map((item, index): NonNullable<ActivityDetail['metrics']>[number] | undefined => {
        const value = optionalText(item.value)
        const label = optionalText(item.label)

        return value && label
          ? {
              id: item.id ?? `metric-${index + 1}`,
              value,
              suffix: optionalText(item.suffix),
              label,
              description: optionalText(item.description)
            }
          : undefined
      })
      .filter((item): item is NonNullable<ActivityDetail['metrics']>[number] => Boolean(item))
  )
}

function toPayloadTimeline(activity: TopicPayloadActivity): ActivityDetail['timeline'] {
  return optionalArray(
    (activity.timeline ?? [])
      .map((item, index): ActivityTimelineItem | undefined => {
        const description = optionalText(item.description)

        if (!description) {
          return undefined
        }

        return {
          id: item.id ?? `timeline-${index + 1}`,
          time: optionalText(item.time),
          dateLabel: optionalText(item.dateLabel) ?? optionalText(item.time) ?? `${index + 1}`,
          title: optionalText(item.title),
          value: optionalText(item.value),
          description
        }
      })
      .filter((item): item is ActivityTimelineItem => Boolean(item))
  )
}

function toPayloadRichBody(activity: TopicPayloadActivity): ActivityDetail['richBody'] {
  return optionalArray(
    (activity.richBody ?? [])
      .map((item, index): ActivityRichBodyBlock | undefined => {
        const id = item.id ?? `rich-body-${index + 1}`
        const type = item.blockType ?? 'paragraph'
        const text = optionalText(item.text)

        if (type === 'orderedList') {
          const items = (item.items ?? [])
            .map((entry) => optionalText(entry.item))
            .filter((entry): entry is string => Boolean(entry))

          return items.length > 0 ? { id, type, items } : undefined
        }

        if (type === 'figure') {
          const image = toPublicMedia(item.image)
          const caption = optionalText(item.caption)

          return image || caption
            ? {
                id,
                type,
                image,
                number: optionalText(item.number),
                tone: optionalNumber(item.tone),
                caption,
                credit: optionalText(item.credit)
              }
            : undefined
        }

        if (!text) {
          return undefined
        }

        if (type === 'heading') {
          return {
            id,
            type,
            text,
            level: item.level === '3' ? 3 : 2
          }
        }

        if (type === 'quote') {
          return {
            id,
            type,
            text,
            attribution: optionalText(item.attribution)
          }
        }

        return {
          id,
          type: 'paragraph',
          text
        }
      })
      .filter((item): item is ActivityRichBodyBlock => Boolean(item))
  )
}

function toPayloadPhotoStrip(activity: TopicPayloadActivity): ActivityDetail['photoStrip'] {
  const items = optionalArray(
    (activity.photoStrip?.items ?? [])
      .map((item, index): ActivityPhotoStripItem | undefined => {
        const caption = optionalText(item.caption)

        if (!caption) {
          return undefined
        }

        return {
          id: item.id ?? `photo-strip-${index + 1}`,
          number: optionalText(item.number),
          caption,
          tone: optionalNumber(item.tone),
          image: toPublicMedia(item.image)
        }
      })
      .filter((item): item is ActivityPhotoStripItem => Boolean(item))
  )

  if (!items) {
    return undefined
  }

  return {
    title: optionalText(activity.photoStrip?.title),
    totalLabel: optionalText(activity.photoStrip?.totalLabel),
    href: optionalText(activity.photoStrip?.href),
    items
  }
}

function isRelatedActivity(value: number | TopicPayloadActivity): value is TopicPayloadActivity {
  return typeof value === 'object' && value !== null && 'slug' in value && 'title' in value
}

function toRelatedArchive(value: number | TopicPayloadActivity): ActivityRelatedArchive | undefined {
  if (!isRelatedActivity(value) || value.status !== 'published') {
    return undefined
  }

  const { themeLabel } = getThemeMetadata(value)
  const coverImage = toPublicMedia(value.cover?.image)

  return {
    id: String(value.id ?? value.slug),
    title: value.title,
    href: `/activities/${value.slug}`,
    slug: value.slug,
    archiveNumber: optionalText(value.archiveNumber),
    dateLabel: value.eventDate
      ? getActivityDateLabel(value.eventDate.slice(0, 10), value.endDate?.slice(0, 10))
      : undefined,
    themeLabel,
    image: coverImage,
    coverImage
  }
}

function toDetailFromFixture(activity: ActivityFixture): ActivityDetail {
  const mediaCount = countUniqueMedia([activity.coverImage, ...activity.heroImages, ...activity.gallery])

  return {
    ...activity,
    href: `/activities/${activity.slug}`,
    dateLabel: formatFixtureDateRange(activity),
    dateSort: activity.date.start,
    locationLabel: formatFixtureLocation(activity),
    mediaCount,
    videoCount: activity.videos.length,
    linkCount: activity.links.length
  }
}

function toDetailFromPayload(activity: PayloadActivity): ActivityDetail {
  const topicActivity = activity as TopicPayloadActivity
  const { theme, themeLabel } = getThemeMetadata(activity)
  const baseCoverImage = toPublicMedia(activity.cover?.image)
  const coverImage = baseCoverImage
    ? {
        ...baseCoverImage,
        caption: activity.cover?.caption ?? baseCoverImage.caption,
        credit: activity.cover?.credit ?? baseCoverImage.credit
      }
    : undefined
  const gallery = (activity.gallery ?? [])
    .map((item) => {
      const image = toPublicMedia(item.image)

      return image ? { ...image, caption: item.caption ?? image.caption } : undefined
    })
    .filter((image): image is NonNullable<typeof image> => Boolean(image))
  const heroImages = coverImage ? [coverImage] : gallery.slice(0, 1)
  const videos = (activity.videos ?? [])
    .map((item) => toPublicVideo(item))
    .filter((video): video is NonNullable<typeof video> => Boolean(video))
  const speakers = (activity.speakers ?? [])
    .map((item) => toPublicActivityPerson(item, '主讲嘉宾'))
    .filter((person): person is NonNullable<typeof person> => Boolean(person))
  const guests = [...(activity.hosts ?? []), ...(activity.speakers ?? []), ...(activity.participants ?? [])]
    .map((item) => toPublicActivityPerson(item, '参与嘉宾'))
    .filter((person): person is NonNullable<typeof person> => Boolean(person))
    .filter(
      (person, index, people) => people.findIndex((candidate) => candidate.id === person.id) === index
    )
  const organizers = (activity.hosts ?? [])
    .map((item) => toPublicActivityPerson(item, '主持 / 组织者'))
    .filter((person): person is NonNullable<typeof person> => Boolean(person))
    .map((person) => person.name)
  const bodySections = [
    ...lexicalToSections(activity.content),
    ...buildSupplementarySections(activity)
  ]
  const richBody = toPayloadRichBody(topicActivity)

  return {
    slug: activity.slug,
    href: `/activities/${activity.slug}`,
    title: activity.title,
    subtitle: optionalText(topicActivity.subtitle),
    summary: activity.summary,
    albumCategory: optionalText(topicActivity.albumCategory),
    year: activity.year,
    date: {
      start: activity.eventDate.slice(0, 10),
      end: activity.endDate ? activity.endDate.slice(0, 10) : undefined
    },
    dateLabel: getActivityDateLabel(activity.eventDate.slice(0, 10), activity.endDate?.slice(0, 10)),
    dateSort: activity.eventDate,
    location: {
      city: activity.city ?? '',
      venue: activity.venue ?? undefined
    },
    locationLabel: getLocationLabel(activity.city, activity.venue),
    theme,
    themeLabel,
    archiveNumber: optionalText(topicActivity.archiveNumber),
    durationLabel: optionalText(topicActivity.durationLabel),
    dossierLabel: optionalText(topicActivity.dossierLabel),
    byline: toPayloadByline(topicActivity),
    coverImage,
    heroImages,
    gallery,
    videos,
    links: (activity.relatedLinks ?? []).map(toPublicLink),
    tags: (activity.tags ?? []).map((tag) => tag.label),
    guests,
    speakers,
    organizers,
    richBody,
    bodySections:
      bodySections.length > 0 || richBody
        ? bodySections
        : [
            {
              id: 'summary',
              heading: '活动纪要',
              paragraphs: [activity.summary]
            }
          ],
    mediaCount: countUniqueMedia([coverImage, ...heroImages, ...gallery]),
    videoCount: videos.length,
    linkCount: (activity.relatedLinks ?? []).length,
    metrics: toPayloadMetrics(topicActivity),
    timeline: toPayloadTimeline(topicActivity),
    photoStrip: toPayloadPhotoStrip(topicActivity),
    relatedArchives: optionalArray(
      (topicActivity.relatedActivities ?? [])
        .map(toRelatedArchive)
        .filter((item): item is ActivityRelatedArchive => Boolean(item))
    ),
    featured: Boolean(activity.featured),
    updatedAt: activity.updatedAt,
    seo: {
      title: activity.seo?.title ?? activity.title,
      description: activity.seo?.description ?? activity.summary
    }
  }
}

function toListItem(activity: ActivityDetail): ActivityListItem {
  return {
    slug: activity.slug,
    href: activity.href,
    title: activity.title,
    summary: activity.summary,
    albumCategory: activity.albumCategory,
    year: activity.year,
    date: activity.date,
    dateLabel: activity.dateLabel,
    dateSort: activity.dateSort,
    location: activity.location,
    locationLabel: activity.locationLabel,
    theme: activity.theme,
    themeLabel: activity.themeLabel,
    coverImage: activity.coverImage,
    tags: activity.tags,
    guests: activity.guests,
    mediaCount: activity.mediaCount,
    videoCount: activity.videoCount,
    linkCount: activity.linkCount,
    featured: activity.featured
  }
}

const getFixtureActivitySource = cache(async (): Promise<ActivityDetail[]> =>
  activityFixtures
    .map(toDetailFromFixture)
    .sort((left, right) => right.dateSort.localeCompare(left.dateSort))
)

const getPayloadActivitySource = cache(async (): Promise<ActivityDetail[] | null> => {
  try {
    if (!(await isPayloadDatabaseReachable())) {
      return null
    }

    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'activities',
      depth: 2,
      limit: 1000,
      sort: '-eventDate',
      where: {
        status: {
          equals: 'published'
        }
      }
    })

    return docs.map(toDetailFromPayload)
  } catch (error) {
    logPayloadFallback('activities', error)
    return null
  }
})

const getActivitySource = cache(async (): Promise<ActivityDetail[]> => {
  const payloadActivities = await getPayloadActivitySource()

  return payloadActivities ?? getFixtureActivitySource()
})

export async function getActivityList(): Promise<ActivityListItem[]> {
  const activities = await getActivitySource()

  return activities
    .slice()
    .sort((left, right) => right.dateSort.localeCompare(left.dateSort))
    .map(toListItem)
}

export async function getActivityBySlug(slug: string): Promise<ActivityDetail | null> {
  const activities = await getActivitySource()

  return activities.find((activity) => activity.slug === slug) ?? null
}

export async function getActivityDetails(): Promise<ActivityDetail[]> {
  return getActivitySource()
}

export async function getActivitySlugs() {
  const activities = await getActivitySource()

  return activities.map((activity) => activity.slug)
}

export function groupActivitiesByYear(activities: ActivityListItem[]): ActivityYearGroup[] {
  const groups = new Map<number, ActivityListItem[]>()

  for (const activity of activities) {
    groups.set(activity.year, [...(groups.get(activity.year) ?? []), activity])
  }

  return Array.from(groups, ([year, groupedActivities]) => ({
    year,
    activities: groupedActivities
  })).sort((left, right) => right.year - left.year)
}
