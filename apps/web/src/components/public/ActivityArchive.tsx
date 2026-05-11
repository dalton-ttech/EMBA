import Link from 'next/link'
import type { Route } from 'next'
import { siteRoutes } from '@/lib/site-routes'
import type { ActivityDetail, ActivityListItem, ActivityRichBodyBlock } from '@/types/activity'
import { ArchiveMedia } from './ArchiveMedia'
import { ActivityArchiveListClient } from './ActivityArchiveListClient'

export function ActivityArchiveList({ activities }: { activities: ActivityListItem[] }) {
  return <ActivityArchiveListClient activities={activities} />
}

function defaultByline(activity: ActivityDetail) {
  const participants =
    activity.guests.length > 0
      ? `${activity.guests.length} 位参与者`
      : activity.speakers.length > 0
        ? `${activity.speakers.length} 位分享者`
        : '8A-194 班'

  return [
    { id: 'date', label: 'Date · 时间', value: activity.dateLabel },
    { id: 'location', label: 'Location · 地点', value: activity.locationLabel },
    { id: 'participants', label: 'Participants · 参与', value: participants },
    { id: 'editors', label: 'Editors · 编辑部', value: activity.organizers.join(' / ') || '影像组 / 文字组 / 后勤组' }
  ]
}

function defaultMetrics(activity: ActivityDetail): NonNullable<ActivityDetail['metrics']> {
  return [
    {
      id: 'photos',
      value: String(activity.mediaCount),
      label: 'Photos',
      description: '本卷公开照片'
    },
    {
      id: 'videos',
      value: String(activity.videoCount),
      label: 'Videos',
      description: '本卷公开影像'
    },
    {
      id: 'references',
      value: String(activity.linkCount),
      label: 'References',
      description: '延伸链接与资料'
    },
    {
      id: 'tags',
      value: String(activity.tags.length),
      label: 'Tags',
      description: activity.tags.join(' / ') || activity.themeLabel
    }
  ]
}

function defaultBodyBlocks(activity: ActivityDetail): ActivityRichBodyBlock[] {
  const sectionBlocks = activity.bodySections.flatMap<ActivityRichBodyBlock>((section) => [
    { id: `${section.id}-heading`, type: 'heading', text: section.heading, level: 2 },
    ...section.paragraphs.map((paragraph, index) => ({
      id: `${section.id}-${index}`,
      type: 'paragraph' as const,
      text: paragraph
    }))
  ])

  return [{ id: 'summary', type: 'paragraph', text: activity.summary }, ...sectionBlocks]
}

function renderBodyBlock(block: ActivityRichBodyBlock) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="serif" key={block.id}>
          {block.text}
        </h2>
      )
    case 'quote':
      return (
        <blockquote key={block.id}>
          {block.text}
          {block.attribution ? <cite>{block.attribution}</cite> : null}
        </blockquote>
      )
    case 'figure':
      return (
        <figure key={block.id}>
          <div className="ph" data-tone={block.tone ?? 1}>
            {block.image ? (
              <ArchiveMedia
                image={block.image}
                sizes="(min-width: 960px) 740px, 100vw"
                tone={block.tone ?? 1}
              />
            ) : null}
            <span className="ph-num">{block.number ?? 'FIG'}</span>
            <span className="ph-cap">{block.caption}</span>
          </div>
          {block.caption ? (
            <figcaption>
              <span>{block.caption}</span>
              <span>{block.number ?? 'Figure'}</span>
            </figcaption>
          ) : null}
        </figure>
      )
    case 'orderedList':
      return (
        <ol key={block.id}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      )
    case 'paragraph':
    default:
      return <p key={block.id}>{block.text}</p>
  }
}

function getRelatedHref(related: NonNullable<ActivityDetail['relatedArchives']>[number]) {
  return (related.href ?? (related.slug ? siteRoutes.activity(related.slug) : siteRoutes.activities)) as Route
}

function renderDetailTitle(activity: ActivityDetail) {
  if (activity.slug === 'gobi21') {
    return (
      <>
        跨越风沙的
        <br />
        <em>121 公里</em>，
        <br />
        载誉而归。
      </>
    )
  }

  return activity.title
}

export function ActivityArchiveDetail({ activity }: { activity: ActivityDetail }) {
  const archiveNumber = activity.archiveNumber ?? '001'
  const bodyBlocks = activity.richBody ?? defaultBodyBlocks(activity)
  const byline = activity.byline ?? defaultByline(activity)
  const metrics = activity.metrics ?? defaultMetrics(activity)
  const stripItems =
    activity.photoStrip?.items.slice(0, 4) ??
    activity.gallery.slice(0, 4).map((image, index) => ({
      id: image.id,
      image,
      number: `No. ${String(index + 1).padStart(2, '0')}`,
      caption: image.caption ?? image.alt,
      tone: (index % 4) + 1
    }))
  const relatedArchives = activity.relatedArchives ?? []
  const coverImage = activity.heroImages[0] ?? activity.coverImage ?? activity.gallery[0]
  const timelineTitle = activity.durationLabel?.includes('4 日') ? '四日时刻表 / Schedule' : '关键节点 / Timeline'

  return (
    <main className="activity-detail" aria-labelledby="activity-detail-title">
      <nav className="crumb" aria-label="活动详情导航">
        <Link href={siteRoutes.home}>首页</Link>
        <span className="sep">/</span>
        <Link href={siteRoutes.activities}>活动归档</Link>
        <span className="sep">/</span>
        <span>{activity.year}</span>
        <span className="sep">/</span>
        <span>{activity.themeLabel}</span>
        <span className="sep">/</span>
        <span>No. {archiveNumber}</span>
      </nav>

      <header className="ar-hero" data-screen-label="03 Activity Detail / Hero">
        <div className="ar-meta">
          <span>
            <span className="key">No.</span>
            <span className="accent">{archiveNumber}</span>
          </span>
          <span>
            <span className="key">Year</span>
            {activity.year}
          </span>
          <span>
            <span className="key">Topic</span>
            {activity.themeLabel}
          </span>
          <span>
            <span className="key">Duration</span>
            {activity.durationLabel ?? activity.dateLabel}
          </span>
          <span className="ar-meta__right">Dossier / {activity.dossierLabel ?? activity.themeLabel}</span>
        </div>

        <h1 className="ar-title serif" id="activity-detail-title">
          {renderDetailTitle(activity)}
        </h1>
        <p className="ar-deck">{activity.subtitle ?? activity.summary}</p>

        <dl className="byline">
          {byline.map((item) => (
            <div className="by-item" key={item.id}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {coverImage ? (
        <section className="cover">
          <div className="ph" data-tone="2">
            <ArchiveMedia
              fallbackLabel={activity.title}
              image={coverImage}
              priority
              sizes="(min-width: 1560px) 1460px, 100vw"
              tone={2}
            />
            <span className="ph-num">Cover / 1</span>
            <span className="ph-cap">{coverImage.caption ?? activity.title}</span>
          </div>
          <div className="credit">
            <span>{coverImage.credit ?? '摄影 / 班级影像编辑部'}</span>
            <span>Frame 1 / 1 / 21:9</span>
          </div>
        </section>
      ) : null}

      <article className="body" data-screen-label="03 Activity Detail / Body">
        {bodyBlocks.map(renderBodyBlock)}
      </article>

      <section className="metrics" data-screen-label="03 Activity Detail / Metrics">
        <div className="metrics-inner">
          {metrics.map((metric) => (
            <div className="metric" key={metric.id}>
              <div className="num">
                {metric.value}
                {metric.suffix ? <em>{metric.suffix}</em> : null}
              </div>
              <div className="lab">{metric.label}</div>
              {metric.description ? <div className="desc">{metric.description}</div> : null}
            </div>
          ))}
        </div>
      </section>

      {stripItems.length > 0 ? (
        <section className="photo-strip" data-screen-label="03 Activity Detail / Photos">
          <h2 className="serif">
            {activity.photoStrip?.title ?? `影像 ${Math.min(stripItems.length, 4)} / ${activity.mediaCount}`}
            <span className="meta">
              <Link className="linkline" href={(activity.photoStrip?.href ?? siteRoutes.gallery) as Route}>
                {activity.photoStrip?.totalLabel ?? '查看本卷全部'}
              </Link>
            </span>
          </h2>
          <div className="strip-grid">
            {stripItems.map((item, index) => (
              <div className={['a', 'b', 'c', 'd'][index] ?? ''} key={item.id}>
                <div className="ph" data-tone={item.tone ?? index + 1}>
                  {item.image ? (
                    <ArchiveMedia
                      image={item.image}
                      sizes="(min-width: 960px) 42vw, 100vw"
                      tone={item.tone ?? index + 1}
                    />
                  ) : null}
                  <span className="ph-num">{item.number}</span>
                  <span className="ph-cap">{item.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {activity.timeline?.length ? (
        <section className="timeline" data-screen-label="03 Activity Detail / Timeline">
          <h2 className="serif">{timelineTitle}</h2>
          <div className="tl-list">
            {activity.timeline.map((item) => (
              <div className="tl-row" key={item.id}>
                <span className="t">{item.time ?? item.dateLabel}</span>
                <span className="km serif">{item.value ?? item.title}</span>
                <span className="desc">{item.description}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {relatedArchives.length > 0 ? (
        <section className="related" data-screen-label="03 Activity Detail / Related">
          <div className="related-head">
            <h2 className="serif">相关归档 / Related</h2>
            <Link className="arrow-link" href={siteRoutes.activities}>
              查看全部归档 <span className="arr">→</span>
            </Link>
          </div>
          <div className="rel-grid">
            {relatedArchives.map((related) => (
              <Link className="rel-card" href={getRelatedHref(related)} key={related.id}>
                <div className="ph" data-tone={related.tone ?? 1}>
                  {related.image ?? related.coverImage ? (
                    <ArchiveMedia
                      image={related.image ?? related.coverImage}
                      sizes="(min-width: 960px) 28vw, 100vw"
                      tone={related.tone ?? 1}
                    />
                  ) : null}
                  <span className="ph-num">{related.number ?? related.archiveNumber ?? related.id}</span>
                  <span className="ph-cap">{related.meta ?? related.dateLabel ?? related.themeLabel}</span>
                </div>
                <div className="num">{related.number ?? related.archiveNumber}</div>
                <div className="ttl serif">{related.title}</div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}
