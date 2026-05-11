import type { VideoLibraryItem, VideoYearGroup } from '@/types/media-library'
import { getActivityDetails } from './activities'

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
})

function formatDate(value?: string) {
  if (!value) {
    return undefined
  }

  return dateFormatter.format(new Date(`${value}T00:00:00+08:00`)).replaceAll('/', '.')
}

export async function getVideoLibrary(): Promise<VideoLibraryItem[]> {
  const activities = await getActivityDetails()

  return activities
    .flatMap((activity) =>
      activity.videos.map((video) => ({
        id: video.id,
        title: video.title,
        href: video.href,
        providerLabel: video.providerLabel,
        category: video.category,
        categoryLabel: video.categoryLabel,
        duration: video.duration,
        sortDate: video.publishedAt ?? activity.dateSort,
        publishedAtLabel: formatDate(video.publishedAt),
        activityTitle: activity.title,
        activitySlug: activity.slug,
        locationLabel: activity.locationLabel,
        themeLabel: activity.themeLabel,
        year: activity.year,
        thumbnail: video.thumbnail ?? activity.coverImage ?? activity.heroImages[0] ?? activity.gallery[0]
      }))
    )
    .sort((left, right) => right.sortDate.localeCompare(left.sortDate))
}

export function groupVideosByYear(items: VideoLibraryItem[]): VideoYearGroup[] {
  const groups = new Map<number, VideoLibraryItem[]>()

  for (const item of items) {
    groups.set(item.year, [...(groups.get(item.year) ?? []), item])
  }

  return Array.from(groups, ([year, groupedItems]) => ({
    year,
    items: groupedItems.sort((left, right) => right.sortDate.localeCompare(left.sortDate))
  })).sort((left, right) => right.year - left.year)
}
