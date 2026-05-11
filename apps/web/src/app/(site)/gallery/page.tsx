import type { Metadata } from 'next'
import { GalleryArchive } from '@/components/public'
import { getGalleryAlbums, getGallerySpotlight } from '@/lib/public-content'

export const metadata: Metadata = {
  title: '相册 · HKU-PKU EMBA 8A-194 班级档案馆',
  description: '从教室到草坪，从读书会到戈21 报名现场。班级影像编辑部按主题归档。'
}

export default async function GalleryPage() {
  const [albums, spotlight] = await Promise.all([getGalleryAlbums(), getGallerySpotlight()])

  return <GalleryArchive albums={albums} spotlight={spotlight} />
}
