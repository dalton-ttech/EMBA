import type { ComponentPropsWithoutRef } from 'react'
import type { PublicTone } from '@/types/public-ui'
import { cx } from './utils'

export interface PublicShellProps extends ComponentPropsWithoutRef<'div'> {
  tone?: PublicTone
}

export function PublicShell({
  tone = 'archive',
  className,
  children,
  ...props
}: PublicShellProps) {
  return (
    <div className={cx('public-shell', `public-shell--${tone}`, className)} {...props}>
      {children}
    </div>
  )
}
