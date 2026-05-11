import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import type { PublicCardVariant } from '@/types/public-ui'
import { cx } from './utils'

export interface PublicCardProps extends Omit<ComponentPropsWithoutRef<'article'>, 'title'> {
  title?: ReactNode
  copy?: ReactNode
  media?: ReactNode
  variant?: PublicCardVariant
}

export function PublicCard({
  title,
  copy,
  media,
  variant = media ? 'media' : 'plain',
  className,
  children,
  ...props
}: PublicCardProps) {
  return (
    <article className={cx('public-card', `public-card--${variant}`, className)} {...props}>
      {media}
      {(title || copy || children) && (
        <div className="public-card__body">
          {title ? <h3 className="public-card__title">{title}</h3> : null}
          {copy ? <p className="public-card__copy">{copy}</p> : null}
          {children}
        </div>
      )}
    </article>
  )
}
