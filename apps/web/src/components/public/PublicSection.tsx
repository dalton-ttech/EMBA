import type { ComponentPropsWithoutRef } from 'react'
import type { PublicContainerWidth, PublicSectionSpacing } from '@/types/public-ui'
import { cx } from './utils'

export interface PublicSectionProps extends ComponentPropsWithoutRef<'section'> {
  width?: PublicContainerWidth
  spacing?: PublicSectionSpacing
  uncontained?: boolean
}

export function PublicSection({
  width = 'content',
  spacing = 'regular',
  uncontained = false,
  className,
  children,
  ...props
}: PublicSectionProps) {
  return (
    <section
      className={cx(
        'public-section',
        spacing !== 'regular' && `public-section--${spacing}`,
        className
      )}
      {...props}
    >
      {uncontained ? (
        children
      ) : (
        <div
          className={cx(
            'public-container',
            width !== 'content' && `public-container--${width}`
          )}
        >
          {children}
        </div>
      )}
    </section>
  )
}
