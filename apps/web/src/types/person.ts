import type { ActivityMedia } from './activity'

export type PublicPersonCategory = 'classmate' | 'guest' | 'faculty' | 'host' | 'staff' | 'other'

export interface PersonActivityReference {
  slug: string
  title: string
  href: string
  dateLabel: string
  year: number
}

export interface PublicPersonProfile {
  id: string
  slug: string
  name: string
  number?: string
  englishName?: string
  role?: string
  group?: string
  city?: string
  industry?: string
  quote?: string
  relatedLabels?: string[]
  tone?: number
  category: PublicPersonCategory
  categoryLabel: string
  title?: string
  organization?: string
  bio?: string
  avatar?: ActivityMedia
  activityCount: number
  featured: boolean
  relatedActivities: PersonActivityReference[]
}
