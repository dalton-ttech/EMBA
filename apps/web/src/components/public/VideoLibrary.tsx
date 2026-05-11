import type { VideoLibraryItem } from '@/types/media-library'
import { VideoGrid } from './VideoGrid'

export function VideoLibrary({ items }: { items: VideoLibraryItem[] }) {
  const categoryCount = new Set(
    items.map((item) => item.categoryLabel ?? item.category ?? item.themeLabel)
  ).size

  return (
    <main className="media-library media-library--video video-archive" aria-labelledby="video-archive-title">
      <header className="vh" data-screen-label="05 Videos / Header">
        <div className="vh-inner">
          <span className="label">影像 / Films</span>
          <h1 className="serif" id="video-archive-title">
            {items.length} 段影像，
            <br />
            关于 <em>这一程</em>。
          </h1>
          <p className="lede">
            由班级影像编辑部出品。从戈壁纪录片到嘉宾对话，每一段都附拍摄记录与剪辑卡。
          </p>
          <div className="stat-line" aria-label="视频统计">
            <span>
              <em>{items.length}</em> Films
            </span>
            <span>
              <em>{categoryCount}</em> Categories
            </span>
            <span>
              <em>3</em> Activities
            </span>
          </div>
        </div>
      </header>

      <VideoGrid items={items} />
    </main>
  )
}
