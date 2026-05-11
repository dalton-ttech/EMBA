export const breakpoints = {
  mobile: 390,
  tablet: 768,
  desktop: 1200,
  wide: 1440
} as const

export const fonts = {
  display: "'Noto Serif SC', 'Songti SC', serif",
  body: "'Noto Sans SC', 'Microsoft YaHei', sans-serif"
} as const

export const colors = {
  canvas: 'oklch(0.965 0.012 92)',
  canvasSoft: 'oklch(0.94 0.015 92)',
  surface: 'oklch(0.985 0.008 92)',
  surfaceRaised: 'oklch(0.995 0.006 96)',
  surfaceTint: 'oklch(0.91 0.024 118)',
  surfaceInverse: 'oklch(0.22 0.025 68)',
  ink: 'oklch(0.22 0.025 68)',
  body: 'oklch(0.36 0.02 68)',
  muted: 'oklch(0.52 0.018 68)',
  subtle: 'oklch(0.66 0.016 74)',
  border: 'oklch(0.82 0.018 84)',
  borderStrong: 'oklch(0.64 0.022 76)',
  accent: 'oklch(0.48 0.096 42)',
  accentStrong: 'oklch(0.38 0.11 40)',
  accentMuted: 'oklch(0.78 0.054 58)',
  academic: 'oklch(0.38 0.052 154)',
  academicMuted: 'oklch(0.76 0.045 150)',
  link: 'oklch(0.42 0.07 218)',
  focus: 'oklch(0.57 0.12 72)',
  success: 'oklch(0.47 0.08 150)',
  warning: 'oklch(0.62 0.105 72)',
  danger: 'oklch(0.52 0.12 28)'
} as const

export const space = {
  '2xs': '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px'
} as const

export const sectionSpace = {
  sm: 'clamp(48px, 7vw, 88px)',
  md: 'clamp(72px, 10vw, 128px)',
  lg: 'clamp(96px, 14vw, 176px)'
} as const

export const layout = {
  narrow: '720px',
  content: '1040px',
  wide: '1280px',
  gutter: 'clamp(16px, 4vw, 48px)'
} as const

export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  round: '999px'
} as const

export const typeScale = {
  xs: '0.78rem',
  sm: '0.92rem',
  md: '1rem',
  lg: 'clamp(1.125rem, 1.6vw, 1.35rem)',
  xl: 'clamp(1.5rem, 3vw, 2.25rem)',
  '2xl': 'clamp(2.25rem, 6vw, 4.5rem)',
  '3xl': 'clamp(3.5rem, 12vw, 8.75rem)'
} as const

export const media = {
  cover: '16 / 9',
  wide: '21 / 9',
  portrait: '4 / 5'
} as const

export const motion = {
  durationFast: '120ms',
  duration: '180ms',
  durationSlow: '320ms',
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
  easeEmphasis: 'cubic-bezier(0.16, 1, 0.3, 1)'
} as const

export type BreakpointName = keyof typeof breakpoints
export type ColorToken = keyof typeof colors
export type SpaceToken = keyof typeof space
export type TypeScaleToken = keyof typeof typeScale
