import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { PublicMediaVariant } from '@/types/public-ui'
import { cx } from './utils'

export interface PublicMediaFrameProps extends ComponentPropsWithoutRef<'figure'> {
  variant?: PublicMediaVariant
  caption?: ReactNode
}

export function PublicMediaFrame({
  variant = 'cover',
  caption,
  className,
  children,
  ...props
}: PublicMediaFrameProps) {
  return (
    <figure
      className={cx('public-media', variant !== 'cover' && `public-media--${variant}`, className)}
      {...props}
    >
      {children}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}
