import Link from 'next/link'
import { siteRoutes } from '@/lib/site-routes'
import type { ActivityMedia } from '@/types/activity'
import type { HomePortalContent } from '@/types/site-content'
import { ArchiveMedia } from './ArchiveMedia'

const collageFrames = [
  { className: 'c1', number: 'No. 001', tone: 3, caption: '毕业典礼 / 港大 / 2026.04' },
  { className: 'c2', number: 'No. 002', tone: 2, caption: '戈21 终点合影 / 敦煌 / 2026.05' },
  { className: 'c3', number: 'No. 003', tone: 1, caption: '读书会 / 北京 / 2025.10' },
  { className: 'c4', number: 'No. 004', tone: 4, caption: '春日草坪音乐会 / 上海 / 2026.04' },
  { className: 'c5', number: 'No. 005', tone: 2, caption: '企业参访 · 字节 / 北京 / 2025.11' },
  { className: 'c6', number: 'No. 006', tone: 1, caption: '戈壁集训 / 银川 / 2025.04' },
  { className: 'c7', number: 'No. 007', tone: 3, caption: '嘉宾对话 · 张教授 / 港大 / 2025.09' },
  { className: 'c8', number: 'No. 008', tone: 4, caption: '迎新晚宴 / 深圳 / 2025.09' }
] as const

const archiveTiles = [
  {
    href: siteRoutes.gallery,
    label: 'Gallery',
    title: '相册',
    caption: '按主题与活动归档的影像。点开看戈壁的清晨、上海的草坪、港大的雨。',
    tone: 3
  },
  {
    href: siteRoutes.videos,
    label: 'Video',
    title: '影像',
    caption: '戈壁挑战赛纪录片、晚宴花絮、嘉宾对话片段。班级影像编辑部出品，共 6 段。',
    tone: 2
  },
  {
    href: siteRoutes.people,
    label: 'People',
    title: '人物',
    caption: '同班的 35 位同学，与往返于 8A 194 的 8 位嘉宾、4 位教授/导师。',
    tone: 1
  }
] as const

function statValue(content: HomePortalContent, keywords: string[], fallback: string) {
  return (
    content.settings.home.stats.find((stat) =>
      keywords.some((keyword) => `${stat.value}${stat.label}`.includes(keyword))
    )?.value ?? fallback
  )
}

function hasRealMedia(image: ActivityMedia | undefined): image is ActivityMedia {
  return Boolean(image && !image.src.startsWith('/media/placeholders/'))
}

function isLikelyGroupMedia(image: ActivityMedia) {
  const searchable = [image.id, image.src, image.alt, image.caption].join(' ').toLowerCase()
  const isPortraitRatio =
    typeof image.width === 'number' && typeof image.height === 'number'
      ? image.height > image.width
      : false

  return (
    !isPortraitRatio &&
    !searchable.includes('portrait') &&
    !searchable.includes('chairman') &&
    !searchable.includes('donation')
  )
}

function getCollageImages(activity: HomePortalContent['featuredActivities'][number] | undefined) {
  if (!activity) {
    return []
  }

  const seen = new Set<string>()
  const media: ActivityMedia[] = []

  for (const image of [...activity.gallery, ...activity.heroImages, activity.coverImage]) {
    if (!hasRealMedia(image) || seen.has(image.src)) {
      continue
    }

    seen.add(image.src)
    media.push(image)
  }

  const groupMedia = media.filter(isLikelyGroupMedia)

  return groupMedia.length >= collageFrames.length ? groupMedia : media
}

export function HomePortal({ content }: { content: HomePortalContent }) {
  const [leadActivity] = content.featuredActivities
  const collageImages = getCollageImages(leadActivity)
  const activityCount = statValue(content, ['活动', 'Activities'], String(content.featuredActivities.length))
  const memberCount = statValue(content, ['同学', 'Members'], '35')
  const photoCount = statValue(content, ['照片', 'Photos'], '82')
  const videoCount = statValue(content, ['视频', 'Films'], '6')

  return (
    <main className="home-page">
      <section className="hero" data-screen-label="01 Home / Hero">
        <div className="hero-grid">
          <div className="hero-mast">
            <div className="l">
              <em>SUM 2026.05</em> 本周更新 / 戈21 影像
            </div>
            <div className="c">HKU PKU EMBA 8A 194 / 班级档案馆</div>
            <div className="r">
              No. 001-03 / {activityCount} 卷
            </div>
          </div>

          <div className="collage" aria-hidden="true">
            {collageFrames.map((frame, index) => (
              <div className={`col-card ${frame.className}`} key={frame.number}>
                <div className="ph" data-tone={frame.tone}>
                  {collageImages.length > 0 ? (
                    <ArchiveMedia
                      fallbackLabel={frame.caption}
                      image={collageImages[index % collageImages.length]}
                      sizes="(min-width: 1100px) 18vw, 42vw"
                      tone={frame.tone}
                    />
                  ) : null}
                  <span className="ph-num">{frame.number}</span>
                  <span className="ph-cap">{frame.caption}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="hero-center">
            <div className="hero-eyebrow">
              <span className="dot" />
              HKU / PKU EMBA / CLASS 8A / 194
            </div>
            <h1 className="hero-title">
              <span className="line">在风沙里，</span>
              <span className="line">在春序中，</span>
              <span className="line">我们<em>共此</em>一程。</span>
            </h1>
            <p className="hero-sub">
              这是 HKU-PKU EMBA 8A 194班级的数字档案馆。把零散的活动、照片、文章与人物，整理成可被检索、可被传阅、可长期沉淀的一卷。
            </p>
          </div>

          <div className="hero-strip">
            <span>
              <em>●</em>&nbsp;LIVE / 最新归档
            </span>
            <div className="ticker" aria-label="最新活动">
              <div className="ticker-track">
                {[...content.featuredActivities, ...content.featuredActivities].map((activity, index) => (
                  <span key={`${activity.slug}-${index}`}>
                    <em>{activity.dateLabel}</em>
                    {activity.title}
                  </span>
                ))}
              </div>
            </div>
            <span>↓ 滚动 / Scroll</span>
          </div>
        </div>
      </section>

      <section className="intro" data-screen-label="01 Home / Intro">
        <div className="intro-inner">
          <div className="reveal">
            <span className="label">关于本馆 / The Archive</span>
          </div>
          <div className="reveal">
            <h2 className="serif">
              一群读书、走戈壁、做企业的人，把 <em>走过的路</em> 留下来。
            </h2>
            <p>
              HKU-PKU EMBA 8A 194班，{memberCount} 位同学，自 2025 年入学至今，跨过戈壁挑战赛、企业参访、读书会、若干春序与寒夜。这座档案馆把那些原本散落在朋友圈、群聊和公众号里的瞬间，按年份、主题、地点和人物归档。
            </p>
            <div className="stat-row">
              <div className="stat">
                <div className="num">
                  <em>{memberCount}</em>
                </div>
                <div className="lab">同学 / Members</div>
              </div>
              <div className="stat">
                <div className="num">{activityCount}</div>
                <div className="lab">归档活动 / Activities</div>
              </div>
              <div className="stat">
                <div className="num">{photoCount}</div>
                <div className="lab">照片 / Photos</div>
              </div>
              <div className="stat">
                <div className="num">{videoCount}</div>
                <div className="lab">影像 / Films</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {leadActivity ? (
        <section className="feature reveal" data-screen-label="01 Home / Feature">
          <div className="feature-inner">
            <div className="feature-head">
              <div>
                <span className="label">头条归档 / Featured</span>
                <div className="ttl serif">本期专题 / 戈21</div>
              </div>
              <Link className="arrow-link" href={siteRoutes.activities}>
                查看全部归档 <span className="arr">→</span>
              </Link>
            </div>

            <div className="feature-grid">
              <Link className="feature-hero" href={siteRoutes.activity(leadActivity.slug)}>
                <div className="feature-hero-media">
                  <ArchiveMedia
                    fallbackLabel="Gobi 21 / 121km / 4 日 3 夜"
                    image={leadActivity.coverImage}
                    priority
                    sizes="(min-width: 1100px) 58vw, 100vw"
                    tone={2}
                  />
                </div>
                <div className="label-overlay">{leadActivity.dateLabel} / GOBI</div>
              </Link>
              <div className="feature-meta">
                <div>
                  <div className="kicker">2026.03 — 公益专题 № 14</div>
                  <h3 className="serif">HKU EMBA / 8A 班为港大 <em>戈 21</em> 赛加油，累计捐赠 133 万</h3>
                  <p>从筹备到出征，再到载誉而归——8A 班连续两届投入港大戈友会公益事业。本期归档收录全部 9 张影像、2 段对内分享视频、以及一份按城市梳理的捐赠人名册。</p>
                </div>
                <dl className="meta-row">
                  <div>
                    <dt>主题</dt>
                    <dd>戈壁 / 公益</dd>
                  </div>
                  <div>
                    <dt>地点</dt>
                    <dd>{leadActivity.locationLabel}</dd>
                  </div>
                  <div>
                    <dt>归档</dt>
                    <dd>9 / 2</dd>
                  </div>
                </dl>
                <Link className="arrow-link" href={siteRoutes.activity(leadActivity.slug)}>
                  阅读专题 / Read the dossier <span className="arr">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="index-section" data-screen-label="01 Home / Recent Index">
        <div className="index-inner">
          <div className="index-head">
            <div>
              <span className="label">近期归档 / Recent</span>
              <h2 className="serif">最近 {content.featuredActivities.length} 条</h2>
            </div>
            <div className="ctrls" aria-label="活动入口">
              <Link className="on" href={siteRoutes.activities}>
                全部
              </Link>
              <Link href={`${siteRoutes.activities}?y=2026`}>2026</Link>
              <Link href={`${siteRoutes.activities}?y=2025`}>2025</Link>
              <Link href={siteRoutes.activities}>归档全表 →</Link>
            </div>
          </div>

          {content.featuredActivities.map((activity, index) => (
            <Link className="index-row" href={siteRoutes.activity(activity.slug)} key={activity.slug}>
              <div className="num">No. {String(index + 1).padStart(3, '0')}</div>
              <div className="date">{activity.dateLabel}</div>
              <div className="title serif">{activity.title}</div>
              <div className="topic">
                <span>{index === 0 ? '戈壁' : index === 1 ? '晚宴' : '公益'}</span>
              </div>
              <div className="place">{activity.locationLabel}</div>
              <div className="arr">→</div>
              <div className="preview ph" data-tone={index + 2}>
                <span className="ph-cap">{activity.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="manifesto reveal" data-screen-label="01 Home / Manifesto">
        <div className="manifesto-inner">
          <div className="quote-mark">"</div>
          <div>
            <blockquote>
              我们一起读书，一起走戈壁，一起做企业。
              <br />
              而 <em>留下来</em> 的那些瞬间，
              <br />
              终将成为下一届的 <em>地图</em>。
            </blockquote>
            <cite>8A 194班级编辑部 / 写于第二个春天</cite>
          </div>
        </div>
      </section>

      <section className="threeup" data-screen-label="01 Home / Three-up">
        <div className="threeup-inner">
          {archiveTiles.map((tile) => (
            <Link className="tile reveal" href={tile.href} key={tile.title}>
              <div className="ph" data-tone={tile.tone}>
                <span className="ph-num">{tile.label}</span>
                <span className="ph-cap">{tile.title}</span>
              </div>
              <div className="meta">
                <h3>{tile.title}</h3>
                <span className="mono">{tile.label}</span>
              </div>
              <p>{tile.caption}</p>
              <div className="arrow-link">
                进入{tile.title} <span className="arr">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
