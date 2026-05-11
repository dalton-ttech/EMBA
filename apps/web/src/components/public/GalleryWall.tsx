'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { GalleryPhotoItem } from '@/types/media-library'
import { siteRoutes } from '@/lib/site-routes'
import { ArchiveMedia } from './ArchiveMedia'
import { cx } from './utils'

export interface GalleryWallPhoto extends GalleryPhotoItem {
  number: string
  activitySlug: string
  activityTitle: string
  originLabel: string
  aspectRatio: string
  tone: number
}

export interface GalleryVolume {
  id: string
  label: string
  compactLabel: string
  imageCount: number
  years: number[]
  photos: GalleryWallPhoto[]
}

interface GalleryWallProps {
  volumes: GalleryVolume[]
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

function getNextIndex(index: number, total: number, offset: 1 | -1) {
  return (index + offset + total) % total
}

function hasRealImage(photo: GalleryWallPhoto) {
  return Boolean(photo.image && !photo.image.src.startsWith('/media/placeholders/'))
}

export function GalleryWall({ volumes }: GalleryWallProps) {
  const firstVolumeId = volumes[0]?.id ?? ''
  const [activeVolumeId, setActiveVolumeId] = useState(firstVolumeId)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const albumParam = new URLSearchParams(window.location.search).get('album')

    if (albumParam && volumes.some((volume) => volume.id === albumParam)) {
      setActiveVolumeId(albumParam)
    }
  }, [volumes])

  const activeVolume = useMemo(
    () => volumes.find((volume) => volume.id === activeVolumeId) ?? volumes[0],
    [activeVolumeId, volumes]
  )

  const activePhoto =
    lightboxIndex === null || !activeVolume ? undefined : activeVolume.photos[lightboxIndex]

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const moveLightbox = useCallback(
    (offset: 1 | -1) => {
      if (!activeVolume?.photos.length) {
        return
      }

      setLightboxIndex((currentIndex) =>
        currentIndex === null
          ? currentIndex
          : getNextIndex(currentIndex, activeVolume.photos.length, offset)
      )
    },
    [activeVolume]
  )

  useEffect(() => {
    if (lightboxIndex === null) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxIndex])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (lightboxIndex === null) {
        return
      }

      if (event.key === 'Escape') {
        closeLightbox()
      }

      if (event.key === 'ArrowRight') {
        moveLightbox(1)
      }

      if (event.key === 'ArrowLeft') {
        moveLightbox(-1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeLightbox, lightboxIndex, moveLightbox])

  if (!activeVolume) {
    return (
      <section className="gallery" aria-label="相册墙">
        <div className="gallery-inner">
          <article className="empty-state-card">
            <strong>相册正在整理</strong>
            <p>公开图片接入后，会在这里按四卷呈现。</p>
          </article>
        </div>
      </section>
    )
  }

  return (
    <>
      <div className="albums" role="tablist" aria-label="相册卷册">
        {volumes.map((volume) => (
          <button
            aria-controls={`gallery-panel-${volume.id}`}
            aria-selected={volume.id === activeVolume.id}
            className={cx('album', volume.id === activeVolume.id && 'on')}
            id={`gallery-tab-${volume.id}`}
            key={volume.id}
            onClick={() => setActiveVolumeId(volume.id)}
            role="tab"
            style={buttonReset}
            type="button"
          >
            <span className="nm">{volume.label}</span>
            <span className="ct">{volume.imageCount} 张</span>
          </button>
        ))}
      </div>

      <section
        aria-labelledby={`gallery-tab-${activeVolume.id}`}
        className="gallery"
        data-screen-label="04 Gallery / Wall"
        id={`gallery-panel-${activeVolume.id}`}
        role="tabpanel"
      >
        <div className="gallery-inner">
          {activeVolume.photos.length > 0 ? (
            <div className="masonry">
              {activeVolume.photos.map((photo, index) => (
                <button
                  aria-label={`打开 ${photo.caption || photo.activityTitle}，第 ${index + 1} 张`}
                  className="mtile"
                  key={photo.id}
                  onClick={() => setLightboxIndex(index)}
                  style={buttonReset}
                  type="button"
                >
                  <div
                    className="ph"
                    data-tone={photo.tone}
                    style={{ aspectRatio: photo.aspectRatio }}
                  >
                    {hasRealImage(photo) ? (
                      <ArchiveMedia
                        fallbackLabel="暂无相册图片"
                        image={photo.image}
                        sizes="(min-width: 1100px) 24vw, (min-width: 700px) 48vw, 100vw"
                        tone={photo.tone}
                      />
                    ) : null}
                    <span className="ph-num">№ {photo.number}</span>
                    <span className="ph-cap">{photo.caption}</span>
                  </div>
                  <span className="pin">
                    № {photo.number} · {activeVolume.compactLabel}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <article className="empty-state-card">
              <strong>{activeVolume.label} 正在整理</strong>
              <p>本卷暂无可公开展示的图片。</p>
            </article>
          )}
        </div>
      </section>

      <div
        aria-label="相册大图"
        aria-modal="true"
        className={cx('lb', lightboxIndex !== null && 'open')}
        onClick={(event) => {
          if (event.currentTarget === event.target) {
            closeLightbox()
          }
        }}
        role="dialog"
      >
        {activePhoto ? (
          <div className="lb-inner">
            <div className="lb-top">
              <span>
                <span>№ {activePhoto.number}</span> / <span>{activeVolume.photos.length}</span>
              </span>
              <span className="ttl">{activeVolume.label}</span>
              <button
                className="lb-x"
                onClick={closeLightbox}
                ref={closeButtonRef}
                type="button"
              >
                关闭 ESC
              </button>
            </div>

            <div className="lb-stage">
              <div className="ph lb-photo-frame" data-tone={activePhoto.tone}>
                {hasRealImage(activePhoto) ? (
                  <ArchiveMedia
                    fallbackLabel="暂无相册图片"
                    image={activePhoto.image}
                    imageClassName="activity-image lb-photo-image"
                    sizes="92vw"
                    tone={activePhoto.tone}
                  />
                ) : null}
                <span className="ph-num">№ {activePhoto.number}</span>
                <span className="ph-cap">{activePhoto.caption}</span>
              </div>
            </div>

            <div className="lb-bot">
              <div className="cap">
                {activePhoto.caption || '暂无说明'}{' '}
                <span className="meta">
                  来自 / FROM{' '}
                  <Link href={siteRoutes.activity(activePhoto.activitySlug)}>
                    {activePhoto.originLabel}
                  </Link>
                </span>
              </div>
              <div className="lb-nav">
                <button
                  aria-label="上一张照片"
                  onClick={() => moveLightbox(-1)}
                  type="button"
                >
                  ←
                </button>
                <button
                  aria-label="下一张照片"
                  onClick={() => moveLightbox(1)}
                  type="button"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}
