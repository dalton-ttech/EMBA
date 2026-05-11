import type { ComponentPropsWithoutRef } from 'react'
import type {
  PublicHeadingAlign,
  PublicHeadingContent,
  PublicHeadingLevel
} from '@/types/public-ui'
import { cx } from './utils'

export interface PublicHeadingProps
  extends PublicHeadingContent,
    Omit<ComponentPropsWithoutRef<'header'>, 'title'> {
  align?: PublicHeadingAlign
  level?: PublicHeadingLevel
  hero?: boolean
}

export function PublicHeading({
  eyebrow,
  title,
  summary,
  align = 'start',
  level = 'h2',
  hero = false,
  className,
  ...props
}: PublicHeadingProps) {
  const TitleTag = level

  return (
    <header
      className={cx('public-heading', align === 'center' && 'public-heading--center', className)}
      {...props}
    >
      {eyebrow ? <p className="public-heading__eyebrow">{eyebrow}</p> : null}
      <TitleTag className={cx('public-heading__title', hero && 'public-heading__title--hero')}>
        {title}
      </TitleTag>
      {summary ? <p className="public-heading__summary">{summary}</p> : null}
    </header>
  )
}
