import type { Metadata } from 'next'
import { ContactHub } from '@/components/public'
import { env } from '@/lib/env'
import { getSiteSettings } from '@/lib/public-content'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return {
    title: `联系 · ${settings.seo.siteName}`,
    description: settings.contact.summary,
    alternates: {
      canonical: new URL('/contact', env.siteUrl).toString()
    }
  }
}

export default async function ContactPage() {
  const settings = await getSiteSettings()

  return <ContactHub settings={settings} />
}
