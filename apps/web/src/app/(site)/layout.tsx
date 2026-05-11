import { SiteChrome } from '@/components/public'
import { getSiteSettings } from '@/lib/public-content'

export default async function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getSiteSettings()

  return (
    <SiteChrome
      footerNote={settings.seo.footerNote}
      primaryEmail={settings.contact.primaryEmail}
      siteName={settings.seo.siteName}
    >
      {children}
    </SiteChrome>
  )
}
