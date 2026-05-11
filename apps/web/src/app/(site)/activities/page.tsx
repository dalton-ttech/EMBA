import type { Metadata } from 'next'
import { ActivityArchiveList } from '@/components/public'
import { getActivityList } from '@/lib/public-content'

export const metadata: Metadata = {
  title: '活动归档 · EMBA 8A 班级档案馆',
  description: '从入学到毕业，按年份切换、按主题筛选，或翻阅整部归档。'
}

export default async function ActivitiesPage() {
  const activities = await getActivityList()

  return <ActivityArchiveList activities={activities} />
}
