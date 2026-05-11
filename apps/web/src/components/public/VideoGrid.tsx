'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ActivityVideoCategory } from '@/types/activity'
import type { VideoLibraryItem } from '@/types/media-library'
import { siteRoutes } from '@/lib/site-routes'
import { ArchiveMedia } from './ArchiveMedia'
import { cx } from './utils'

type FilmCategory = '纪录' | '对话' | '花絮' | '片段'
type VideoFilter = 'ALL' | FilmCategory

type VideoCompat = VideoLibraryItem & {
  cat?: FilmCategory
  description?: string
  director?: string
  format?: string
  sourceLabel?: string
}

interface VideoGridProps {
  items: VideoLibraryItem[]
}

const categories: Array<{ id: VideoFilter; label: string }> = [
  { id: 'ALL', label: '全部 · All' },
  { id: '纪录', label: '纪录片' },
  { id: '对话', label: '嘉宾对话' },
  { id: '花絮', label: '活动花絮' },
  { id: '片段', label: '分享片段' }
]

const categoryByValue: Record<ActivityVideoCategory, FilmCategory> = {
  documentary: '纪录',
  dialogue: '对话',
  highlights: '花絮',
  clip: '片段'
}

const buttonReset = {
  background: 'transparent',
  border: 0,
  color: 'inherit',
  font: 'inherit',
  padding: 0,
  textAlign: 'inherit',
  width: '100%'
} as const

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, '')
}

export function getFilmCategory(item: VideoLibraryItem): FilmCategory {
  const compat = item as VideoCompat

  if (item.category) {
    return categoryByValue[item.category]
  }

  if (compat.cat) {
    return compat.cat
  }

  if (item.categoryLabel?.includes('对话')) {
    return '对话'
  }

  if (item.categoryLabel?.includes('花絮')) {
    return '花絮'
  }

  if (item.categoryLabel?.includes('片段')) {
    return '片段'
  }

  const haystack = [item.title, item.themeLabel, item.activityTitle, item.providerLabel]
    .join(' ')
    .toLowerCase()

  if (/片段|节选|分享|clip|excerpt/i.test(haystack)) {
    return '片段'
  }

  if (/对话|访谈|论坛|圆桌|教授|嘉宾|talk|dialogue|forum/i.test(haystack)) {
    return '对话'
  }

  if (/花絮|回顾|参访|访学|晚宴|草坪|vlog|behind|visit|tour/i.test(haystack)) {
    return '花絮'
  }

  return '纪录'
}

function formatRuntime(runtime?: string) {
  return runtime?.replace(':', ' : ') ?? '待补'
}

function getFilmNumber(index: number) {
  return `V·${String(index + 1).padStart(2, '0')}`
}

function getVideoDescription(item: VideoLibraryItem) {
  const compat = item as VideoCompat

  return compat.description ?? `${item.activityTitle} · ${item.themeLabel} · ${item.locationLabel}`
}

export function VideoGrid({ items }: VideoGridProps) {
  const [activeFilter, setActiveFilter] = useState<VideoFilter>('ALL')
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const featuredVideo = items[0]

  const categoryCounts = useMemo(() => {
    const counts = new Map<VideoFilter, number>([['ALL', items.length]])

    for (const item of items) {
      const category = getFilmCategory(item)
      counts.set(category, (counts.get(category) ?? 0) + 1)
    }

    return counts
  }, [items])

  const filteredItems = useMemo(
    () =>
      items.filter((item) => activeFilter === 'ALL' || getFilmCategory(item) === activeFilter),
    [activeFilter, items]
  )

  const activeVideo = useMemo(
    () => items.find((item) => item.id === activeVideoId),
    [activeVideoId, items]
  )

  const closePlayer = useCallback(() => {
    setActiveVideoId(null)
  }, [])

  useEffect(() => {
    if (!activeVideoId) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
    }
  }, [activeVideoId])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && activeVideoId) {
        closePlayer()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeVideoId, closePlayer])

  if (!items.length) {
    return (
      <section className="films" aria-label="视频列表">
        <div className="films-inner">
          <article className="empty-state-card">
            <strong>影像资料正在整理</strong>
            <p>公开视频接入后，会在这里按分类呈现。</p>
          </article>
        </div>
      </section>
    )
  }

  return (
    <>
      {featuredVideo ? (
        <section className="feat-film" data-screen-label="05 Videos / Featured">
          <button
            aria-label={`播放特色影片：${featuredVideo.title}`}
            className="feat-stage"
            onClick={() => setActiveVideoId(featuredVideo.id)}
            style={buttonReset}
            type="button"
          >
            <div className="ph" data-tone="2">
              <ArchiveMedia
                fallbackLabel="暂无视频封面"
                image={featuredVideo.thumbnail}
                sizes="(min-width: 1100px) 62vw, 100vw"
                tone={2}
              />
              <span className="ph-num">FEATURE FILM</span>
              <span className="ph-cap">
                {featuredVideo.title} / {featuredVideo.publishedAtLabel ?? featuredVideo.year}
              </span>
            </div>
            <span className="runtime">{formatRuntime(featuredVideo.duration)}</span>
            <span className="play">▶ 播放</span>
          </button>

          <div className="feat-meta">
            <span className="kicker">本期长片 · Featured</span>
            <h2 className="serif">{featuredVideo.title}</h2>
            <p>{getVideoDescription(featuredVideo)}</p>
            <dl className="meta-row">
              <div>
                <dt>Runtime</dt>
                <dd>{formatRuntime(featuredVideo.duration)}</dd>
              </div>
              <div>
                <dt>Source</dt>
                <dd>{featuredVideo.providerLabel}</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>{featuredVideo.publishedAtLabel ?? featuredVideo.year}</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>{(featuredVideo as VideoCompat).format ?? 'Online'}</dd>
              </div>
            </dl>
          </div>
        </section>
      ) : null}

      <div className="cats">
        <div className="cats-inner" role="tablist" aria-label="视频分类">
          <span className="lab">分类 / Category</span>
          {categories.map((category) => (
            <button
              aria-selected={activeFilter === category.id}
              className={cx('chip', activeFilter === category.id && 'on')}
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              role="tab"
              type="button"
            >
              {category.label} — {categoryCounts.get(category.id) ?? 0}
            </button>
          ))}
        </div>
      </div>

      <section className="films" data-screen-label="05 Videos / Grid">
        <div className="films-inner">
          {filteredItems.length > 0 ? (
            <div className="film-grid">
              {filteredItems.map((item, index) => {
                const category = getFilmCategory(item)
                const number = getFilmNumber(index)

                return (
                  <button
                    aria-label={`播放 ${item.title}`}
                    className="film"
                    key={item.id}
                    onClick={() => setActiveVideoId(item.id)}
                    style={buttonReset}
                    type="button"
                  >
                    <div className="stage">
                      <div className="ph" data-tone={(index % 4) + 1}>
                        <ArchiveMedia
                          fallbackLabel="暂无视频封面"
                          image={item.thumbnail}
                          sizes="(min-width: 1100px) 30vw, 100vw"
                          tone={(index % 4) + 1}
                        />
                        <span className="ph-num">{number}</span>
                        <span className="ph-cap">
                          {stripHtml(item.title)} / {item.duration ?? '待补'}
                        </span>
                      </div>
                      <span className="runtime">{item.duration ?? '待补'}</span>
                      <span className="play-mini">▶</span>
                    </div>
                    <div className="meta">
                      <span className="num">{number}</span>
                      <span className="ttl">{item.title}</span>
                      <span className="cat">{category}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <article className="empty-state-card">
              <strong>暂无匹配视频</strong>
              <p>换一个分类继续浏览。</p>
            </article>
          )}
        </div>
      </section>

      <div
        aria-label="视频播放器"
        aria-modal="true"
        className={cx('player', activeVideo && 'open')}
        onClick={(event) => {
          if (event.currentTarget === event.target) {
            closePlayer()
          }
        }}
        role="dialog"
      >
        {activeVideo ? (
          <div className="player-inner">
            <div className="player-top">
              <div className="ttl serif">{activeVideo.title}</div>
              <button className="px" onClick={closePlayer} ref={closeButtonRef} type="button">
                关闭 ESC
              </button>
            </div>
            <div className="player-stage">
              <div className="ph" data-tone="2">
                <ArchiveMedia
                  fallbackLabel="暂无视频封面"
                  image={activeVideo.thumbnail}
                  sizes="90vw"
                  tone={2}
                />
                <span className="ph-num">PLAYER</span>
                <span className="ph-cap">
                  {activeVideo.title} / {activeVideo.duration ?? '待补'}
                </span>
              </div>
              <div className="player-bar">
                <a className="pp" href={activeVideo.href} rel="noreferrer" target="_blank">
                  ▶
                </a>
                <div className="scrub" aria-hidden="true" />
                <span className="ts">00:00 / {activeVideo.duration ?? '待补'}</span>
              </div>
            </div>
            <dl className="player-bottom">
              <div className="desc">{getVideoDescription(activeVideo)}</div>
              <div>
                <dt>Runtime</dt>
                <dd>{formatRuntime(activeVideo.duration)}</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>{activeVideo.publishedAtLabel ?? activeVideo.year}</dd>
              </div>
              <div>
                <dt>Source</dt>
                <dd>
                  <Link href={siteRoutes.activity(activeVideo.activitySlug)}>
                    {activeVideo.activityTitle}
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        ) : null}
      </div>
    </>
  )
}
