import type { Metadata } from 'next'
import { AboutOverview } from '@/components/public'
import { env } from '@/lib/env'
import { getSiteSettings } from '@/lib/public-content'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return {
    title: `班级 · ${settings.seo.siteName}`,
    description: settings.about.summary,
    alternates: {
      canonical: new URL('/about', env.siteUrl).toString()
    }
  }
}

export default async function AboutPage() {
  const settings = await getSiteSettings()

  return <AboutOverview settings={settings} />
}
