import type { GalleryAlbumItem, GallerySpotlightImage } from '@/types/media-library'
import { getActivityDetails } from './activities'
import { claudeworkGalleryAlbums } from './claudework-placeholders'

function isClaudeworkPlaceholderSource(activities: Awaited<ReturnType<typeof getActivityDetails>>) {
  const slugs = activities.map((activity) => activity.slug).sort().join(',')

  return slugs === 'chunxu,gobi21,hku-charity'
}

export async function getGalleryAlbums(): Promise<GalleryAlbumItem[]> {
  const activities = await getActivityDetails()

  if (isClaudeworkPlaceholderSource(activities)) {
    return claudeworkGalleryAlbums
  }

  return activities.map((activity) => ({
    id: activity.slug,
    activitySlug: activity.slug,
    title: activity.title,
    year: activity.year,
    sortDate: activity.dateSort,
    dateLabel: activity.dateLabel,
    locationLabel: activity.locationLabel,
    themeLabel: activity.themeLabel,
    summary: activity.summary,
    coverImage: activity.coverImage ?? activity.heroImages[0] ?? activity.gallery[0],
    imageCount: activity.gallery.length,
    photos: activity.gallery.map((image, index) => ({
      id: image.id,
      number: String(index + 1).padStart(2, '0'),
      caption: image.caption ?? image.alt,
      activitySlug: activity.slug,
      activityTitle: activity.title,
      image,
      tone: (index % 4) + 1
    }))
  }))
}

export async function getGallerySpotlight(): Promise<GallerySpotlightImage[]> {
  const activities = await getActivityDetails()

  if (isClaudeworkPlaceholderSource(activities)) {
    return claudeworkGalleryAlbums.flatMap((album) =>
      (album.photos ?? []).slice(0, 2).map((photo) => ({
        id: photo.id,
        image: photo.image,
        activityTitle: photo.activityTitle ?? album.title,
        activitySlug: photo.activitySlug ?? album.activitySlug,
        year: album.year,
        locationLabel: album.locationLabel
      }))
    )
  }

  return activities.flatMap((activity) =>
    activity.gallery.slice(0, 2).map((image) => ({
      id: image.id,
      image,
      activityTitle: activity.title,
      activitySlug: activity.slug,
      year: activity.year,
      locationLabel: activity.locationLabel
    }))
  )
}
