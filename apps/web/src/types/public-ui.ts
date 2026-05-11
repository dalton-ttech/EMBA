import type { ReactNode } from 'react'

export type PublicTone = 'archive' | 'academic' | 'warm' | 'quiet'

export type PublicContainerWidth = 'narrow' | 'content' | 'wide'

export type PublicSectionSpacing = 'compact' | 'regular' | 'spacious'

export type PublicHeadingLevel = 'h1' | 'h2' | 'h3'

export type PublicHeadingAlign = 'start' | 'center'

export type PublicCardVariant = 'plain' | 'feature' | 'media' | 'quote'

export type PublicMediaVariant = 'cover' | 'wide' | 'portrait'

export type PublicButtonVariant = 'primary' | 'secondary' | 'ghost'

export type PublicLinkTarget = '_self' | '_blank'

export interface PublicAction {
  label: string
  href: string
  variant?: PublicButtonVariant
  target?: PublicLinkTarget
}

export interface PublicMediaAsset {
  src: string
  alt: string
  width?: number
  height?: number
  caption?: ReactNode
}

export interface PublicHeadingContent {
  eyebrow?: ReactNode
  title: ReactNode
  summary?: ReactNode
}
