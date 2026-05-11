import type { Metadata } from 'next'
import { VideoLibrary } from '@/components/public'
import { getVideoLibrary } from '@/lib/public-content'

export const metadata: Metadata = {
  title: '影像 · EMBA 8A 班级档案馆',
  description: '由班级影像编辑部出品。从戈壁纪录片到嘉宾对话，每一段都附拍摄记录与剪辑卡。'
}

export default async function VideosPage() {
  const items = await getVideoLibrary()

  return <VideoLibrary items={items} />
}
