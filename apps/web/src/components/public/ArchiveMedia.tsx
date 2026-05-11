import Image from 'next/image'
import type { ComponentPropsWithoutRef } from 'react'
import type { ActivityMedia } from '@/types/activity'
import { cx } from './utils'

export interface ArchiveMediaProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  image?: ActivityMedia
  sizes: string
  priority?: boolean
  fallbackLabel?: string
  imageClassName?: string
  tone?: number
}

export function ArchiveMedia({
  image,
  sizes,
  priority = false,
  fallbackLabel = '暂无公开封面',
  className,
  imageClassName = 'activity-image',
  tone = 3,
  ...props
}: ArchiveMediaProps) {
  if (!image || image.src.startsWith('/media/placeholders/')) {
    return (
      <div className={cx('archive-image-placeholder ph', className)} data-tone={tone} {...props}>
        <span className="ph-cap">{image?.caption ?? fallbackLabel}</span>
      </div>
    )
  }

  return (
    <Image
      alt={image.alt}
      className={cx(imageClassName, className)}
      height={image.height ?? 900}
      priority={priority}
      sizes={sizes}
      src={image.src}
      width={image.width ?? 1600}
    />
  )
}
