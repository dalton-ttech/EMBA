import { HomePortal } from '@/components/public'
import { getHomePortalContent } from '@/lib/public-content'

export default async function HomePage() {
  const content = await getHomePortalContent()

  return <HomePortal content={content} />
}
