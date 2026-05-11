import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import type { PublicButtonVariant } from '@/types/public-ui'
import { cx } from './utils'

type PublicButtonBaseProps = {
  children: ReactNode
  className?: string
  variant?: PublicButtonVariant
}

type PublicButtonLinkProps = PublicButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

type PublicButtonNativeProps = PublicButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never
  }

export type PublicButtonProps = PublicButtonLinkProps | PublicButtonNativeProps

export function PublicButton(props: PublicButtonProps) {
  const { variant = 'primary', className, children } = props
  const buttonClassName = cx('public-button', `public-button--${variant}`, className)

  if ('href' in props && typeof props.href === 'string') {
    const {
      variant: consumedVariant,
      className: consumedClassName,
      children: consumedChildren,
      href,
      ...anchorProps
    } = props

    void consumedVariant
    void consumedClassName
    void consumedChildren

    return (
      <a className={buttonClassName} href={href} {...anchorProps}>
        {children}
      </a>
    )
  }

  const {
    variant: consumedVariant,
    className: consumedClassName,
    children: consumedChildren,
    type = 'button',
    ...buttonProps
  } = props

  void consumedVariant
  void consumedClassName
  void consumedChildren

  return (
    <button className={buttonClassName} type={type} {...buttonProps}>
      {children}
    </button>
  )
}
