import type { ActivityMedia, ActivityVideoCategory } from './activity'

export interface GalleryPhotoItem {
  id: string
  number?: string
  caption: string
  activityTitle?: string
  activitySlug?: string
  image?: ActivityMedia
  aspectRatio?: string
  tone?: number
}

export interface VideoLibraryItem {
  id: string
  title: string
  href: string
  providerLabel: string
  category?: ActivityVideoCategory
  categoryLabel?: string
  duration?: string
  sortDate: string
  publishedAtLabel?: string
  activityTitle: string
  activitySlug: string
  locationLabel: string
  themeLabel: string
  year: number
  thumbnail?: ActivityMedia
}

export interface VideoYearGroup {
  year: number
  items: VideoLibraryItem[]
}

export interface GalleryAlbumItem {
  id: string
  albumKey?: string
  compactTitle?: string
  activitySlug: string
  title: string
  year: number
  sortDate: string
  dateLabel: string
  locationLabel: string
  themeLabel: string
  summary: string
  coverImage?: ActivityMedia
  imageCount: number
  photos?: GalleryPhotoItem[]
}

export interface GallerySpotlightImage {
  id: string
  image?: ActivityMedia
  activityTitle: string
  activitySlug: string
  year: number
  locationLabel: string
}
