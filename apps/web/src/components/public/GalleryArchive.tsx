import type { GalleryAlbumItem, GalleryPhotoItem, GallerySpotlightImage } from '@/types/media-library'
import { GalleryWall, type GalleryVolume, type GalleryWallPhoto } from './GalleryWall'

type GalleryAlbumCompat = GalleryAlbumItem & {
  category?: string
  categoryLabel?: string
}

const galleryVolumes = [
  {
    id: 'gobi21',
    label: '戈壁挑战赛 · Ultra Gobi',
    compactLabel: '戈壁挑战赛 · Ultra Gobi',
    match: /戈|gobi|沙鸣|拉练|出征/i
  },
  {
    id: 'banquet',
    label: '班级晚宴 · Banquets',
    compactLabel: '班级晚宴 · Banquets',
    match: /晚宴|宴|草坪|春序|迎新|reunion|banquet/i
  },
  {
    id: 'visit',
    label: '企业参访 · Visits',
    compactLabel: '企业参访 · Visits',
    match: /参访|访学|企业|移动课堂|visit|tour|study/i
  },
  {
    id: 'reading',
    label: '读书会 · Reading',
    compactLabel: '读书会 · Reading',
    match: /读书|阅读|论坛|课堂|分享|reading|forum|salon|class/i
  }
] as const

const aspectRatios = ['3 / 4', '4 / 5', '1 / 1', '4 / 3', '3 / 2', '16 / 10']

const numberFormatter = new Intl.NumberFormat('zh-CN', {
  minimumIntegerDigits: 2,
  maximumFractionDigits: 0
})

function getAlbumVolumeId(album: GalleryAlbumCompat) {
  if (album.albumKey && galleryVolumes.some((volume) => volume.id === album.albumKey)) {
    return album.albumKey
  }

  const searchableText = [
    album.activitySlug,
    album.title,
    album.summary,
    album.locationLabel,
    album.themeLabel,
    album.category,
    album.categoryLabel
  ]
    .filter(Boolean)
    .join(' ')

  return (
    galleryVolumes.find((volume) => volume.match.test(searchableText))?.id ??
    galleryVolumes[galleryVolumes.length - 1].id
  )
}

function fromGalleryPhoto(
  album: GalleryAlbumItem,
  photo: GalleryPhotoItem | undefined,
  index: number
): GalleryWallPhoto {
  const number = photo?.number ?? numberFormatter.format(index + 1)

  return {
    id: photo?.id ?? `${album.id}-photo-${number}`,
    number,
    caption: photo?.caption ?? `${album.title} · ${number}`,
    activitySlug: photo?.activitySlug ?? album.activitySlug,
    activityTitle: photo?.activityTitle ?? album.title,
    originLabel: album.title,
    image: photo?.image,
    aspectRatio: photo?.aspectRatio ?? aspectRatios[index % aspectRatios.length],
    tone: photo?.tone ?? (index % 4) + 1
  }
}

function makeAlbumPhotos(album: GalleryAlbumItem) {
  const photoCount = Math.max(album.imageCount, album.photos?.length ?? 0)

  return Array.from({ length: photoCount }, (_, index) =>
    fromGalleryPhoto(album, album.photos?.[index], index)
  )
}

function buildVolumes(albums: GalleryAlbumItem[]) {
  const volumeMap = new Map<string, GalleryVolume>(
    galleryVolumes.map((volume) => [
      volume.id,
      {
        id: volume.id,
        label: volume.label,
        compactLabel: volume.compactLabel,
        imageCount: 0,
        years: [],
        photos: []
      }
    ])
  )

  for (const album of albums as GalleryAlbumCompat[]) {
    const volume = volumeMap.get(getAlbumVolumeId(album))

    if (!volume) {
      continue
    }

    volume.imageCount += album.imageCount
    volume.years = Array.from(new Set([...volume.years, album.year])).sort((left, right) => right - left)
    volume.photos.push(...makeAlbumPhotos(album))
  }

  return galleryVolumes.map((volume) => volumeMap.get(volume.id)).filter(Boolean) as GalleryVolume[]
}

export function GalleryArchive({
  albums
}: {
  albums: GalleryAlbumItem[]
  spotlight: GallerySpotlightImage[]
}) {
  const volumes = buildVolumes(albums)
  const totalImages = albums.reduce((sum, album) => sum + album.imageCount, 0)
  return (
    <main className="media-library media-library--gallery gallery-archive" aria-labelledby="gallery-archive-title">
      <header className="gh" data-screen-label="04 Gallery / Header">
        <div className="gh-inner">
          <div className="gh-row">
            <div>
              <span className="label">影像 / Gallery</span>
              <h1 className="serif" id="gallery-archive-title">
                {totalImages} 张照片，
                <br />
                归在 <em>{volumes.length} 卷</em>。
              </h1>
              <p className="lede">
                从教室到草坪，从读书会到戈21 报名现场。班级影像编辑部按主题归档，悬停看说明，点击进入大图。
              </p>
            </div>
            <div className="stat-line" aria-label="相册统计">
              <span>
                <em>{totalImages}</em> Photos
              </span>
              <span>
                <em>{volumes.length}</em> Albums
              </span>
              <span>
                <em>3</em> Years
              </span>
            </div>
          </div>
        </div>
      </header>

      <GalleryWall volumes={volumes} />
    </main>
  )
}
