import type { Metadata } from 'next'
import { PeopleDirectory } from '@/components/public'
import { env } from '@/lib/env'
import { getPeopleDirectory, getSiteSettings } from '@/lib/public-content'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  return {
    title: `人物 · ${settings.seo.siteName}`,
    description: '这是一份正在生长的名册。同学按姓氏笔画排序；嘉宾按到访时间排序。',
    alternates: {
      canonical: new URL('/people', env.siteUrl).toString()
    }
  }
}

export default async function PeoplePage() {
  const people = await getPeopleDirectory()

  return <PeopleDirectory people={people} />
}
