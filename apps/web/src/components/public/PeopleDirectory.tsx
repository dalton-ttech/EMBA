'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { PublicPersonProfile } from '@/types/person'
import { siteRoutes } from '@/lib/site-routes'
import { ArchiveMedia } from './ArchiveMedia'
import { cx } from './utils'

type RoleFilter = '全部' | '同学' | '嘉宾' | '教授'

const roleFilters: Array<{ value: RoleFilter; label: string }> = [
  { value: '全部', label: '全部' },
  { value: '同学', label: '同学' },
  { value: '嘉宾', label: '到访嘉宾' },
  { value: '教授', label: '教授 / 导师' }
]

const buttonReset = {
  background: 'transparent',
  border: 0,
  color: 'inherit',
  font: 'inherit',
  padding: 0,
  textAlign: 'inherit',
  width: '100%'
} as const

function getRole(person: PublicPersonProfile): RoleFilter {
  if (person.role === '教授' || person.category === 'faculty') {
    return '教授'
  }

  if (person.role === '嘉宾' || person.category === 'guest') {
    return '嘉宾'
  }

  return '同学'
}

function matchesSearch(person: PublicPersonProfile, query: string) {
  if (!query.trim()) {
    return true
  }

  const haystack = [
    person.name,
    person.englishName,
    person.role,
    person.group,
    person.city,
    person.industry,
    person.quote,
    person.organization,
    person.title
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return haystack.includes(query.trim().toLowerCase())
}

export function PeopleDirectory({ people }: { people: PublicPersonProfile[] }) {
  const [activeRole, setActiveRole] = useState<RoleFilter>('全部')
  const [query, setQuery] = useState('')
  const [activePersonId, setActivePersonId] = useState<string | null>(null)

  const classmateCount = people.filter((person) => getRole(person) === '同学').length
  const guestCount = people.filter((person) => getRole(person) === '嘉宾').length
  const facultyCount = people.filter((person) => getRole(person) === '教授').length
  const roleCounts = new Map<RoleFilter, number>([
    ['全部', people.length],
    ['同学', classmateCount],
    ['嘉宾', guestCount],
    ['教授', facultyCount]
  ])

  const filteredPeople = useMemo(
    () =>
      people.filter((person) => {
        const roleMatch = activeRole === '全部' || getRole(person) === activeRole
        return roleMatch && matchesSearch(person, query)
      }),
    [activeRole, people, query]
  )

  const groupedPeople = useMemo(() => {
    const groups = new Map<string, PublicPersonProfile[]>()

    for (const person of filteredPeople) {
      const group = person.group ?? person.categoryLabel
      groups.set(group, [...(groups.get(group) ?? []), person])
    }

    return Array.from(groups, ([group, members]) => ({ group, members }))
  }, [filteredPeople])

  const activePerson = people.find((person) => person.id === activePersonId)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActivePersonId(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <main className="info-page info-page--people people-page" aria-labelledby="people-page-title">
      <section className="people-hero" data-screen-label="06 People / Header">
        <div>
          <span className="label">人物 / People</span>
          <h1 className="serif" id="people-page-title">
            35 位同学，
            <br />
            12 位 <em>到访嘉宾</em>。
          </h1>
          <p className="lede">
            这是一份正在生长的名册。同学按姓氏笔画排序；嘉宾按到访时间排序。点开任一卡片，看 ta 与 8A-194 的交集。
          </p>
        </div>
        <div className="stat-line people-stat-line" aria-label="人物统计">
          <span>
            <em>{classmateCount}</em> 同学
          </span>
          <span>
            <em>{guestCount}</em> 嘉宾
          </span>
          <span>
            <em>{facultyCount}</em> 教授/导师
          </span>
        </div>
      </section>

      <section className="people-tools" aria-label="人物筛选">
        <div className="people-tabs" role="tablist" aria-label="角色筛选">
          {roleFilters.map((role) => (
            <button
              aria-selected={activeRole === role.value}
              className={cx('rt', activeRole === role.value && 'on')}
              key={role.value}
              onClick={() => setActiveRole(role.value)}
              role="tab"
              type="button"
            >
              {role.label} <small>{roleCounts.get(role.value) ?? 0}</small>
            </button>
          ))}
        </div>
        <label className="people-search">
          <span>Search</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="按姓名 / 行业 / 关键词检索 · SEARCH"
            type="search"
            value={query}
          />
        </label>
      </section>

      <section className="people-directory" aria-label="人物名册">
        {groupedPeople.map(({ group, members }) => (
          <article className="people-group" key={group}>
            <header className="people-group__header">
              <span className="label plain">{members.length} 位 · {members.length} ENTRIES</span>
              <h2 className="serif">{group}</h2>
            </header>
            <div className="people-directory-grid">
              {members.map((person) => (
                <button
                  className="directory-card person-row"
                  key={person.id}
                  onClick={() => setActivePersonId(person.id)}
                  style={buttonReset}
                  type="button"
                >
                  <div className="directory-card__media">
                    <ArchiveMedia
                      fallbackLabel={person.name}
                      image={person.avatar}
                      sizes="(min-width: 960px) 12vw, 38vw"
                      tone={person.tone ?? 2}
                    />
                  </div>
                  <div className="directory-card__body">
                    <header className="directory-card__header">
                      <div className="directory-card__meta">
                        <span>{person.number ?? person.id}</span>
                        <span>{person.role ?? person.categoryLabel}</span>
                        {person.city ? <span>{person.city}</span> : null}
                      </div>
                      <h3>{person.name}</h3>
                      {person.englishName ? <p>{person.englishName}</p> : null}
                    </header>
                    <p>{person.quote ?? person.bio}</p>
                    <footer className="directory-card__footer">
                      <span>{person.industry ?? person.organization ?? person.title}</span>
                    </footer>
                  </div>
                </button>
              ))}
            </div>
          </article>
        ))}

        {filteredPeople.length === 0 ? (
          <article className="empty-state-card">
            <strong>暂无匹配记录</strong>
            <p>No match.</p>
          </article>
        ) : null}
      </section>

      <div
        aria-label="人物详情"
        aria-modal="true"
        className={cx('people-sheet', activePerson && 'open')}
        onClick={(event) => {
          if (event.currentTarget === event.target) {
            setActivePersonId(null)
          }
        }}
        role="dialog"
      >
        {activePerson ? (
          <aside className="people-sheet__panel">
            <button className="people-sheet__close" onClick={() => setActivePersonId(null)} type="button">
              关闭 ESC
            </button>
            <div className="people-sheet__media">
              <ArchiveMedia
                fallbackLabel={activePerson.name}
                image={activePerson.avatar}
                sizes="min(480px, 90vw)"
                tone={activePerson.tone ?? 2}
              />
            </div>
            <div className="people-sheet__body">
              <span className="label plain">{activePerson.number ?? activePerson.role}</span>
              <h2 className="serif">{activePerson.name}</h2>
              {activePerson.englishName ? <p className="people-sheet__en">{activePerson.englishName}</p> : null}
              <p>{activePerson.quote ?? activePerson.bio}</p>
              <dl className="people-sheet__facts">
                <div>
                  <dt>Role</dt>
                  <dd>{activePerson.role ?? activePerson.categoryLabel}</dd>
                </div>
                <div>
                  <dt>Group</dt>
                  <dd>{activePerson.group ?? activePerson.categoryLabel}</dd>
                </div>
                <div>
                  <dt>City</dt>
                  <dd>{activePerson.city ?? activePerson.organization ?? '8A-194'}</dd>
                </div>
                <div>
                  <dt>Industry</dt>
                  <dd>{activePerson.industry ?? activePerson.title ?? '班级档案'}</dd>
                </div>
              </dl>

              {(activePerson.relatedLabels?.length ?? 0) > 0 || activePerson.relatedActivities.length > 0 ? (
                <div className="people-sheet__links">
                  <strong>相关归档</strong>
                  {activePerson.relatedLabels?.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                  {activePerson.relatedActivities.slice(0, 3).map((activity) => (
                    <Link href={siteRoutes.activity(activity.slug)} key={activity.slug}>
                      {activity.title}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </aside>
        ) : null}
      </div>
    </main>
  )
}
