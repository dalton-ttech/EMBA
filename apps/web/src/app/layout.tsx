import type { Metadata } from 'next'
import '@/styles/globals.css'
import { env } from '@/lib/env'
import { getSiteSettings } from '@/lib/public-content'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const ogImage = settings.seo.ogImage

  return {
    metadataBase: new URL(env.siteUrl),
    title: settings.seo.defaultTitle,
    description: settings.seo.defaultDescription,
    keywords: settings.seo.keywords,
    openGraph: {
      title: settings.seo.defaultTitle,
      description: settings.seo.defaultDescription,
      type: 'website',
      url: env.siteUrl,
      images: ogImage
        ? [
            {
              alt: ogImage.alt,
              height: ogImage.height ?? 900,
              url: ogImage.src,
              width: ogImage.width ?? 1600
            }
          ]
        : undefined
    }
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
