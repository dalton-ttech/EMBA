import type { ActivityMedia } from './activity'

export interface SiteStat {
  value: string
  label: string
}

export interface SiteContentSection {
  id: string
  heading: string
  paragraphs: string[]
}

export interface ContactChannel {
  id: string
  label: string
  value: string
  href?: string
}

export interface SeoDefaults {
  siteName: string
  defaultTitle: string
  defaultDescription: string
  keywords: string[]
  ogImage?: ActivityMedia
  footerNote?: string
}

export interface SiteSettingsView {
  home: {
    eyebrow: string
    title: string
    summary: string
    stats: SiteStat[]
    featuredActivitySlugs: string[]
    featuredPersonIds: string[]
  }
  about: {
    eyebrow: string
    title: string
    subtitle?: string
    summary: string
    heroImage?: ActivityMedia
    highlights: SiteStat[]
    sections: SiteContentSection[]
  }
  contact: {
    eyebrow: string
    title: string
    summary: string
    primaryEmail: string
    officeHours?: string
    locationLabel?: string
    newsletterNote: string
    applyHref?: string
    channels: ContactChannel[]
  }
  seo: SeoDefaults
}

export interface HomePortalContent {
  settings: SiteSettingsView
  featuredActivities: Array<{
    slug: string
    title: string
    summary: string
    href: string
    dateLabel: string
    locationLabel: string
    coverImage?: ActivityMedia
    heroImages: ActivityMedia[]
    gallery: ActivityMedia[]
  }>
  featuredPeople: Array<{
    id: string
    name: string
    title?: string
    organization?: string
    bio?: string
    avatar?: ActivityMedia
    activityCount: number
  }>
}
