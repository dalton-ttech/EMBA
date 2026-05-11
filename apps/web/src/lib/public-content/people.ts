import { cache } from 'react'
import type { PublicPersonCategory, PublicPersonProfile } from '@/types/person'
import {
  getPayloadClient,
  isPayloadDatabaseReachable
} from '@/lib/payload/get-payload-client'
import { getActivityDetails } from './activities'
import { peopleFixtures } from './people-fixtures'
import { logPayloadFallback, toPublicMedia } from './payload-utils'
import { getSiteSettingsSource } from './site-settings-source'
import type { Person as PayloadPerson } from '../../../payload-types'

const categoryLabels: Record<PublicPersonCategory, string> = {
  classmate: '班级同学',
  guest: '嘉宾',
  faculty: '教授 / 导师',
  host: '主持人',
  staff: '工作人员',
  other: '其他'
}

type PersonSource = {
  id: string
  slug: string
  name: string
  category: PublicPersonCategory
  number?: string
  englishName?: string
  role?: string
  group?: string
  city?: string
  industry?: string
  quote?: string
  relatedLabels?: string[]
  tone?: number
  title?: string
  organization?: string
  bio?: string
  avatar?: PublicPersonProfile['avatar']
  sortOrder: number
}

function getPublicPeopleSource() {
  return peopleFixtures
    .filter((person) => person.status === 'published' && person.isPublic)
    .sort((left, right) => left.sortOrder - right.sortOrder)
}

const getPayloadPeopleSource = cache(async (): Promise<PayloadPerson[] | null> => {
  try {
    if (!(await isPayloadDatabaseReachable())) {
      return null
    }

    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'people',
      depth: 1,
      limit: 1000,
      sort: 'sortOrder',
      where: {
        and: [
          {
            status: {
              equals: 'published'
            }
          },
          {
            isPublic: {
              equals: true
            }
          }
        ]
      }
    })

    return docs
  } catch (error) {
    logPayloadFallback('people', error)
    return null
  }
})

export const getPeopleDirectory = cache(async (): Promise<PublicPersonProfile[]> => {
  const [activities, payloadPeople, settings] = await Promise.all([
    getActivityDetails(),
    getPayloadPeopleSource(),
    getSiteSettingsSource()
  ])
  const featuredPeople = new Set(settings.home.featuredPersonIds)
  const people: PersonSource[] =
    payloadPeople?.map((person) => {
      const category = (person.roleCategory ?? 'other') as PublicPersonCategory

      return {
        id: String(person.id),
        slug: person.slug ?? String(person.id),
        name: person.name,
        category,
        role: categoryLabels[category],
        title: person.title ?? undefined,
        organization: person.organization ?? undefined,
        bio: person.bio ?? undefined,
        avatar: toPublicMedia(person.avatar),
        sortOrder: person.sortOrder ?? 100
      }
    }) ??
    getPublicPeopleSource().map((person) => ({
      id: person.id,
      slug: person.slug,
      name: person.name,
      number: person.number,
      englishName: person.englishName,
      role: person.role,
      group: person.group,
      city: person.city,
      industry: person.industry,
      quote: person.quote,
      relatedLabels: person.related,
      tone: person.tone,
      category: person.category,
      title: person.title,
      organization: person.organization,
      bio: person.bio,
      avatar: person.avatar,
      sortOrder: person.sortOrder
    }))

  return people
    .map((person) => {
      const relatedActivities = activities
        .filter((activity) =>
          [...activity.speakers, ...activity.guests].some((participant) => participant.id === person.id)
        )
        .map((activity) => ({
          slug: activity.slug,
          title: activity.title,
          href: activity.href,
          dateLabel: activity.dateLabel,
          year: activity.year
        }))

      return {
        id: person.id,
        slug: person.slug,
        name: person.name,
        number: person.number,
        englishName: person.englishName,
        role: person.role,
        group: person.group,
        city: person.city,
        industry: person.industry,
        quote: person.quote,
        relatedLabels: person.relatedLabels,
        tone: person.tone,
        category: person.category,
        categoryLabel: categoryLabels[person.category],
        title: person.title,
        organization: person.organization,
        bio: person.bio,
        avatar: person.avatar,
        activityCount: relatedActivities.length,
        featured: featuredPeople.has(person.id),
        relatedActivities,
        sortOrder: person.sortOrder
      }
    })
    .sort((left, right) => {
      if (left.featured !== right.featured) {
        return left.featured ? -1 : 1
      }

      return left.sortOrder - right.sortOrder
    })
})
