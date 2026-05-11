'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import Link from 'next/link'
import type { Route } from 'next'
import { siteRoutes } from '@/lib/site-routes'
import type { ActivityListItem } from '@/types/activity'
import { ArchiveMedia } from './ArchiveMedia'

type ArchiveYear = 2027 | 2026 | 2025
type YearFilter = ArchiveYear | 'ALL'

const yearTabs: Array<{ year: YearFilter; label: string; count?: string }> = [
  { year: 2027, label: '2027', count: '1 席' },
  { year: 2026, label: '2026', count: '3 项' },
  { year: 2025, label: '2025', count: '1 席' },
  { year: 'ALL', label: 'All / 全部' }
]

const topicTabs = [
  { value: 'ALL', label: '全部 · All' },
  { value: '戈壁', label: '戈壁 · Gobi' },
  { value: '读书会', label: '读书会 · Reading' },
  { value: '企业参访', label: '企业参访 · Visit' },
  { value: '晚宴', label: '晚宴 · Dinner' },
  { value: '嘉宾对话', label: '嘉宾对话 · Talk' },
  { value: '公益', label: '公益 · Charity' },
  { value: '毕业季', label: '毕业季 · Commencement' }
] as const

type TopicFilter = (typeof topicTabs)[number]['value']

type ActivityCardItem =
  | {
      kind: 'activity'
      slug: string
      year: ArchiveYear
      date: string
      number: string
      topic: string
      title: ReactNode
      titleText: string
      place: string
      tone: number
      coverImage?: ActivityListItem['coverImage']
      size?: 'lg' | 'tall' | 'wide'
      href: string
    }
  | {
      kind: 'placeholder'
      id: string
      year: ArchiveYear
      date: string
      number: string
      topic: string
      title: ReactNode
      titleText: string
      place: string
      tone: number
      size?: 'lg' | 'tall' | 'wide'
    }


const yearLedes: Record<ArchiveYear, string> = {
  2027: '毕业之年。答辩、返校、毕业季与最终合影，都将在这一年慢慢汇成属于我们的完整记忆。',
  2026: '同行之年。从敦煌到上海，再到长江边，一次次出发与相聚，把班级共同经历推向更深处。',
  2025: '启程之年。读书、参访、相识与相聚，从这一年开始陆续沉淀，成为班级档案的最初篇章。',
}

const placeholderCards: ActivityCardItem[] = [
  {
    kind: 'placeholder',
    id: 'placeholder-2027',
    year: 2027,
    date: '2027·06·--',
    number: '037',
    topic: '毕业季',
    title: (
      <>
        毕业季 / <em>编辑部整理中...</em>
      </>
    ),
    titleText: '毕业季 / 编辑部整理中...',
    place: '香港 · 北京',
    tone: 4,
    size: 'wide'
  },
  {
    kind: 'placeholder',
    id: 'placeholder-2025',
    year: 2025,
    date: '2025·09·--',
    number: '033',
    topic: '读书会',
    title: (
      <>
        入学与读书会 / <em>编辑部整理中...</em>
      </>
    ),
    titleText: '入学与读书会 / 编辑部整理中...',
    place: '港大 · 北大',
    tone: 1,
    size: 'lg'
  }
]

function activityTopic(activity: ActivityListItem) {
  const searchable = [activity.themeLabel, activity.title, activity.summary, ...activity.tags].join(' ')

  if (/戈|Gobi/i.test(searchable)) return '戈壁'
  if (/春序|晚宴|Banquet/i.test(searchable)) return '晚宴'
  if (/公益|捐赠|Charity/i.test(searchable)) return '公益'
  if (/参访|访学|Visit/i.test(searchable)) return '企业参访'
  if (/读书|Reading/i.test(searchable)) return '读书会'
  if (/嘉宾|对话|Talk|Dialogue/i.test(searchable)) return '嘉宾对话'
  if (/毕业|Commencement/i.test(searchable)) return '毕业季'

  return activity.themeLabel
}

function activityNumber(slug: string) {
  if (slug === 'gobi21') return '036'
  if (slug === 'chunxu') return '035'
  return '034'
}

function activitySize(slug: string): ActivityCardItem['size'] {
  if (slug === 'gobi21') return 'lg'
  if (slug === 'hku-charity') return 'tall'
  return undefined
}

function activityTone(slug: string) {
  if (slug === 'gobi21') return 2
  if (slug === 'chunxu') return 3
  return 4
}

function displayTitle(activity: ActivityListItem): ReactNode {
  if (activity.slug === 'gobi21') {
    return (
      <>
        跨越风沙的 121 公里 / <em>8A 班出征 2026 戈友会</em>，载誉而归
      </>
    )
  }

  if (activity.slug === 'chunxu') {
    return (
      <>
        共赴春序 / 194 班春日草坪 <em>音乐会晚宴</em>
      </>
    )
  }

  return (
    <>
      8A班为港大戈21赛加油，累计捐赠 <em>133万</em>
    </>
  )
}

function toCard(activity: ActivityListItem): ActivityCardItem {
  return {
    kind: 'activity',
    slug: activity.slug,
    year: activity.year as ArchiveYear,
    date: activity.dateLabel.replace(/\./g, '·'),
    number: activityNumber(activity.slug),
    topic: activityTopic(activity),
    title: displayTitle(activity),
    titleText: activity.title,
    place: activity.locationLabel,
    tone: activityTone(activity.slug),
    coverImage: activity.coverImage,
    size: activitySize(activity.slug),
    href: siteRoutes.activity(activity.slug)
  }
}

function visibleGroups(items: ActivityCardItem[], activeYear: YearFilter) {
  const years = activeYear === 'ALL' ? ([2027, 2026, 2025] as ArchiveYear[]) : [activeYear]

  return years.map((year) => ({
    year,
    items: items.filter((item) => item.year === year)
  }))
}

function Card({ item }: { item: ActivityCardItem }) {
  const coverImage =
    item.kind === 'activity' && item.coverImage && !item.coverImage.src.startsWith('/media/placeholders/')
      ? item.coverImage
      : undefined
  const body = (
    <>
      <span className="date">{item.date}</span>
      <div className="ph" data-tone={item.tone}>
        {coverImage ? (
          <ArchiveMedia
            image={coverImage}
            sizes="(min-width: 960px) 42vw, 100vw"
            tone={item.tone}
          />
        ) : null}
        <span className="ph-num">№ {item.number}</span>
        <span className="ph-cap">
          {item.titleText} / {item.place}
        </span>
      </div>
      <div className="card-meta">
        <span className="num">№ {item.number}</span>
        <span className="ttl">{item.title}</span>
        <span className="topic">{item.topic}</span>
      </div>
    </>
  )

  if (item.kind === 'placeholder') {
    return <article className={`card is-placeholder ${item.size ?? ''}`}>{body}</article>
  }

  return (
    <Link className={`card ${item.size ?? ''}`} href={item.href as Route}>
      {body}
    </Link>
  )
}

export function ActivityArchiveListClient({ activities }: { activities: ActivityListItem[] }) {
  const [activeYear, setActiveYear] = useState<YearFilter>(2026)
  const [activeTopic, setActiveTopic] = useState<TopicFilter>('ALL')
  const cards = useMemo(() => [...placeholderCards, ...activities.map(toCard)], [activities])
  const visibleItems = useMemo(
    () =>
      cards.filter((item) => {
        const yearMatch = activeYear === 'ALL' || item.year === activeYear
        const topicMatch = activeTopic === 'ALL' || item.topic === activeTopic

        return yearMatch && topicMatch
      }),
    [activeTopic, activeYear, cards]
  )
  const groups = useMemo(() => visibleGroups(visibleItems, activeYear), [activeYear, visibleItems])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const yearParam = params.get('y')
    const topicParam = params.get('t')

    if (yearParam === 'ALL' || yearParam === '2027' || yearParam === '2026' || yearParam === '2025') {
      setActiveYear(yearParam === 'ALL' ? 'ALL' : Number(yearParam) as ArchiveYear)
    }

    if (topicTabs.some((topic) => topic.value === topicParam)) {
      setActiveTopic(topicParam as TopicFilter)
    }
  }, [])

  function chooseYear(year: YearFilter) {
    setActiveYear(year)
    const params = new URLSearchParams(window.location.search)
    params.set('y', String(year))
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`)
  }

  function chooseTopic(topic: TopicFilter) {
    setActiveTopic(topic)
    const params = new URLSearchParams(window.location.search)
    if (topic === 'ALL') {
      params.delete('t')
    } else {
      params.set('t', topic)
    }
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`)
  }

  return (
    <main className="activity-archive" aria-labelledby="activity-archive-title">
      <header className="ah" data-screen-label="02 Activities / Header">
        <div className="ah-inner">
          <div className="ah-row">
            <div>
              <span className="label">活动归档 / Activity archive</span>
              <h1 id="activity-archive-title" className="serif">
                三年的足迹，
                <br />
                <em>按卷归档</em>。
              </h1>
              <p className="lede">
                从入学到毕业，3 项被记录在册的集体行动。按年份切换、按主题筛选，或翻阅整部归档。
              </p>
            </div>
            <div className="ah-meta">
              <span>
                <em>3</em> 归档
              </span>
              <span>
                <em>7</em> 主题
              </span>
              <span>
                <em>3</em> 年份
              </span>
            </div>
          </div>

          <div className="years" aria-label="年份筛选">
            {yearTabs.map((tab) => (
              <button
                className={activeYear === tab.year ? 'year-tab active' : 'year-tab'}
                data-year={tab.year}
                key={tab.year}
                onClick={() => chooseYear(tab.year)}
                type="button"
              >
                <span className={tab.year === 'ALL' ? 'y-num y-all' : 'y-num'}>{tab.label}</span>
                {tab.count ? <span className="y-count">{tab.count}</span> : null}
              </button>
            ))}
          </div>

          <div className="topics" id="topics" aria-label="主题筛选">
            {topicTabs.map((topic) => (
              <button
                className={activeTopic === topic.value ? 'chip on' : 'chip'}
                data-topic={topic.value}
                key={topic.value}
                onClick={() => chooseTopic(topic.value)}
                type="button"
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="wall" data-screen-label="02 Activities / Wall">
        <div className="wall-inner">
          <div className="wall-grid">
            {groups.map(({ year, items }) => (
              <div className="activity-year-fragment" key={year}>
                <div className="year-sep">
                  <div className="y serif">
                    {String(year).slice(0, 2)}
                    <em>{String(year).slice(2)}</em>
                  </div>
                  <div className="lede serif">{yearLedes[year]}</div>
                  <div className="count">
                    {items.length} 项归档 · {items.length} ENTRIES
                  </div>
                </div>
                {items.map((item) => (
                  <Card item={item} key={item.kind === 'activity' ? item.slug : item.id} />
                ))}
              </div>
            ))}
            {visibleItems.length === 0 ? <div className="empty">这一筛选下暂无归档 / Nothing here yet.</div> : null}
          </div>
        </div>
      </section>
    </main>
  )
}
