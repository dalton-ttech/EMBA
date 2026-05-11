export type ActivityTheme =
  | 'forum'
  | 'studyTour'
  | 'reunion'
  | 'publicClass'
  | 'salon'
  | 'charity'
  | 'other'

export type ActivityVideoProvider =
  | 'wechatChannels'
  | 'tencentVideo'
  | 'bilibili'
  | 'youku'
  | 'douyin'
  | 'youtube'
  | 'vimeo'
  | 'other'

export type ActivityLinkType = 'wechatArticle' | 'website' | 'press' | 'pdf' | 'other'

export interface ActivityDateRange {
  start: string
  end?: string
}

export interface ActivityLocation {
  city: string
  venue?: string
  address?: string
}

export interface ActivityMedia {
  id: string
  src: string
  alt: string
  width?: number
  height?: number
  caption?: string
  credit?: string
}

export type ActivityRichBodyBlock =
  | {
      id: string
      type: 'paragraph'
      text: string
    }
  | {
      id: string
      type: 'heading'
      text: string
      level?: 2 | 3
    }
  | {
      id: string
      type: 'quote'
      text: string
      attribution?: string
    }
  | {
      id: string
      type: 'figure'
      image?: ActivityMedia
      number?: string
      tone?: number
      caption?: string
      credit?: string
    }
  | {
      id: string
      type: 'orderedList'
      items: string[]
    }

export interface ActivityPerson {
  id: string
  name: string
  role?: string
  affiliation?: string
  bio?: string
  avatar?: ActivityMedia
}

export type ActivityVideoCategory = 'documentary' | 'dialogue' | 'highlights' | 'clip'

export interface ActivityVideo {
  id: string
  title: string
  provider: ActivityVideoProvider
  providerLabel: string
  href: string
  category?: ActivityVideoCategory
  categoryLabel?: string
  thumbnail?: ActivityMedia
  duration?: string
  publishedAt?: string
}

export interface ActivityLink {
  id: string
  label: string
  href: string
  type: ActivityLinkType
  source?: string
  publishedAt?: string
}

export interface ActivityBodySection {
  id: string
  heading: string
  paragraphs: string[]
}

export interface ActivityBylineItem {
  id: string
  label: string
  value: string
}

export interface ActivityMetric {
  id: string
  value: string
  suffix?: string
  label: string
  description?: string
}

export interface ActivityTimelineItem {
  id: string
  time?: string
  dateLabel: string
  title?: string
  value?: string
  description: string
}

export interface ActivityPhotoStripItem {
  id: string
  number?: string
  caption: string
  tone?: number
  image?: ActivityMedia
}

export interface ActivityPhotoStrip {
  title?: string
  totalLabel?: string
  href?: string
  items: ActivityPhotoStripItem[]
}

export interface ActivityRelatedArchive {
  id: string
  title: string
  href?: string
  slug?: string
  number?: string
  meta?: string
  tone?: number
  archiveNumber?: string
  dateLabel?: string
  themeLabel?: string
  image?: ActivityMedia
  coverImage?: ActivityMedia
}

export interface ActivityListItem {
  slug: string
  href: string
  title: string
  summary: string
  albumCategory?: string
  year: number
  date: ActivityDateRange
  dateLabel: string
  dateSort: string
  location: ActivityLocation
  locationLabel: string
  theme: ActivityTheme
  themeLabel: string
  coverImage?: ActivityMedia
  tags: string[]
  guests: ActivityPerson[]
  mediaCount: number
  videoCount: number
  linkCount: number
  featured?: boolean
}

export interface ActivityDetail extends ActivityListItem {
  subtitle?: string
  archiveNumber?: string
  durationLabel?: string
  dossierLabel?: string
  byline?: ActivityBylineItem[]
  heroImages: ActivityMedia[]
  gallery: ActivityMedia[]
  videos: ActivityVideo[]
  links: ActivityLink[]
  speakers: ActivityPerson[]
  organizers: string[]
  bodySections: ActivityBodySection[]
  richBody?: ActivityRichBodyBlock[]
  metrics?: ActivityMetric[]
  timeline?: ActivityTimelineItem[]
  photoStrip?: ActivityPhotoStrip
  relatedArchives?: ActivityRelatedArchive[]
  updatedAt: string
  seo: {
    title: string
    description: string
  }
}

export interface ActivityYearGroup {
  year: number
  activities: ActivityListItem[]
}
