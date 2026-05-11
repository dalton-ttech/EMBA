import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ActivityArchiveDetail } from '@/components/public'
import { env } from '@/lib/env'
import { getActivityBySlug, getActivitySlugs, getSiteSettings } from '@/lib/public-content'

interface ActivityDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getActivitySlugs()

  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params
}: ActivityDetailPageProps): Promise<Metadata> {
  const [{ slug }, settings] = await Promise.all([params, getSiteSettings()])
  const activity = await getActivityBySlug(slug)

  if (!activity) {
    return {
      title: `活动未找到 | ${settings.seo.siteName}`
    }
  }

  const canonical = new URL(`/activities/${slug}`, env.siteUrl).toString()
  const previewImage = activity.coverImage ?? activity.heroImages[0] ?? activity.gallery[0]

  return {
    title: `${activity.seo.title} | ${settings.seo.siteName}`,
    description: activity.seo.description,
    alternates: {
      canonical
    },
    openGraph: {
      title: activity.seo.title,
      description: activity.seo.description,
      type: 'article',
      url: canonical,
      images: previewImage
        ? [
            {
              alt: previewImage.alt,
              height: previewImage.height ?? 900,
              url: previewImage.src,
              width: previewImage.width ?? 1600
            }
          ]
        : undefined
    }
  }
}

export default async function ActivityDetailPage({ params }: ActivityDetailPageProps) {
  const { slug } = await params
  const activity = await getActivityBySlug(slug)

  if (!activity) {
    notFound()
  }

  return <ActivityArchiveDetail activity={activity} />
}
