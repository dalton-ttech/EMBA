import { cache } from 'react'
import {
  getPayloadClient,
  isPayloadDatabaseReachable
} from '@/lib/payload/get-payload-client'
import type { SiteSettingsView } from '@/types/site-content'
import { siteSettingsFixture } from './site-fixtures'
import { logPayloadFallback, toPublicMedia } from './payload-utils'
import type { Activity, Person, SiteSetting } from '../../../payload-types'

function getFeaturedActivitySlugs(value: SiteSetting['featuredActivities']) {
  if (!value) {
    return siteSettingsFixture.home.featuredActivitySlugs
  }

  return value
    .map((item) => (typeof item === 'object' && item !== null ? (item as Activity).slug : undefined))
    .filter((slug): slug is string => Boolean(slug))
}

function getFeaturedPersonIds(value: SiteSetting['featuredPeople']) {
  if (!value) {
    return siteSettingsFixture.home.featuredPersonIds
  }

  return value.map((item) => String(typeof item === 'object' && item !== null ? (item as Person).id : item))
}

function mapSiteSettings(settings: SiteSetting): SiteSettingsView {
  return {
    home: {
      eyebrow: settings.homeEyebrow ?? siteSettingsFixture.home.eyebrow,
      title: settings.homeTitle ?? siteSettingsFixture.home.title,
      summary: settings.homeSummary ?? siteSettingsFixture.home.summary,
      stats:
        settings.homeStats?.map((item) => ({
          value: item.value,
          label: item.label
        })) ?? siteSettingsFixture.home.stats,
      featuredActivitySlugs: getFeaturedActivitySlugs(settings.featuredActivities),
      featuredPersonIds: getFeaturedPersonIds(settings.featuredPeople)
    },
    about: {
      eyebrow: siteSettingsFixture.about.eyebrow,
      title: settings.className ?? siteSettingsFixture.about.title,
      subtitle: settings.classSubtitle ?? siteSettingsFixture.about.subtitle,
      summary: settings.classSummary ?? siteSettingsFixture.about.summary,
      heroImage: toPublicMedia(settings.classHeroImage) ?? siteSettingsFixture.about.heroImage,
      highlights:
        settings.classHighlights?.map((item) => ({
          value: item.value,
          label: item.label
        })) ?? siteSettingsFixture.about.highlights,
      sections:
        settings.classSections?.map((item, index) => ({
          id: item.id ?? `class-section-${index + 1}`,
          heading: item.heading,
          paragraphs: item.body
            .split(/\r?\n+/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean)
        })) ?? siteSettingsFixture.about.sections
    },
    contact: {
      eyebrow: siteSettingsFixture.contact.eyebrow,
      title: settings.contactTitle ?? siteSettingsFixture.contact.title,
      summary: settings.contactSummary ?? siteSettingsFixture.contact.summary,
      primaryEmail: settings.primaryEmail ?? siteSettingsFixture.contact.primaryEmail,
      officeHours: settings.officeHours ?? siteSettingsFixture.contact.officeHours,
      locationLabel: settings.locationLabel ?? siteSettingsFixture.contact.locationLabel,
      newsletterNote: settings.newsletterNote ?? siteSettingsFixture.contact.newsletterNote,
      applyHref: settings.applyUrl ?? siteSettingsFixture.contact.applyHref,
      channels:
        settings.contactChannels?.map((item, index) => ({
          id: item.id ?? `contact-channel-${index + 1}`,
          label: item.label,
          value: item.value,
          href: item.url ?? undefined
        })) ?? siteSettingsFixture.contact.channels
    },
    seo: {
      siteName: settings.siteName ?? siteSettingsFixture.seo.siteName,
      defaultTitle: settings.defaultTitle ?? siteSettingsFixture.seo.defaultTitle,
      defaultDescription: settings.defaultDescription ?? siteSettingsFixture.seo.defaultDescription,
      keywords:
        settings.keywords?.map((item) => item.value).filter(Boolean) ?? siteSettingsFixture.seo.keywords,
      ogImage: toPublicMedia(settings.defaultOgImage) ?? siteSettingsFixture.seo.ogImage,
      footerNote: settings.footerNote ?? siteSettingsFixture.seo.footerNote
    }
  }
}

export const getSiteSettingsSource = cache(async (): Promise<SiteSettingsView> => {
  try {
    if (!(await isPayloadDatabaseReachable())) {
      return siteSettingsFixture
    }

    const payload = await getPayloadClient()
    const settings = await payload.findGlobal({
      slug: 'site-settings',
      depth: 1
    })

    return mapSiteSettings(settings)
  } catch (error) {
    logPayloadFallback('site-settings', error)
    return siteSettingsFixture
  }
})
