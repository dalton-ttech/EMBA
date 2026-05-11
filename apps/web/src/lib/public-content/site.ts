import { cache } from 'react'
import type { HomePortalContent } from '@/types/site-content'
import { getActivityDetails } from './activities'
import { getPeopleDirectory } from './people'
import { getSiteSettingsSource } from './site-settings-source'

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined
}

export const getSiteSettings = cache(async () => getSiteSettingsSource())

export const getHomePortalContent = cache(async (): Promise<HomePortalContent> => {
  const [settings, activities, people] = await Promise.all([
    getSiteSettings(),
    getActivityDetails(),
    getPeopleDirectory()
  ])

  const activityIndex = new Map(activities.map((activity) => [activity.slug, activity]))
  const peopleIndex = new Map(people.map((person) => [person.id, person]))

  return {
    settings,
    featuredActivities: settings.home.featuredActivitySlugs
      .map((slug) => activityIndex.get(slug))
      .filter(isDefined)
      .map((activity) => ({
        slug: activity.slug,
        title: activity.title,
        summary: activity.summary,
        href: activity.href,
        dateLabel: activity.dateLabel,
        locationLabel: activity.locationLabel,
        coverImage: activity.coverImage,
        heroImages: activity.heroImages,
        gallery: activity.gallery
      })),
    featuredPeople: settings.home.featuredPersonIds
      .map((id) => peopleIndex.get(id))
      .filter(isDefined)
      .map((person) => ({
        id: person.id,
        name: person.name,
        title: person.title,
        organization: person.organization,
        bio: person.bio,
        avatar: person.avatar,
        activityCount: person.activityCount
      }))
  }
})
