import Link from 'next/link'
import type { SiteSettingsView } from '@/types/site-content'
import { siteRoutes } from '@/lib/site-routes'

const months2027 = [
  ['JAN', '寒假归档', 'future'],
  ['FEB', '', 'future'],
  ['MAR', '毕业筹备', 'future'],
  ['APR', '', 'future'],
  ['MAY', '', 'future'],
  ['JUN', '毕业季', 'future'],
  ['JUL', '', 'dim'],
  ['AUG', '', 'dim'],
  ['SEP', '', 'dim'],
  ['OCT', '', 'dim'],
  ['NOV', '', 'dim'],
  ['DEC', '', 'dim']
]

const months2026 = [
  ['JAN', '跨年夜话', 'strong'],
  ['FEB', '读书会 № 04', ''],
  ['MAR', '参访 · 美的', ''],
  ['APR', '共赴春序', 'strong'],
  ['MAY', '读书 № 05', ''],
  ['JUN', '学期末 · 港大', ''],
  ['JUL', '戈21 集训', 'future'],
  ['AUG', '戈21 集训', 'future'],
  ['SEP', '戈21 出征', 'accent'],
  ['OCT', '读书 № 06', 'future'],
  ['NOV', '参访 · 字节', 'future'],
  ['DEC', '期末', 'future']
]

const months2025 = [
  ['JAN', '', 'dim'],
  ['FEB', '', 'dim'],
  ['MAR', '', 'dim'],
  ['APR', '', 'dim'],
  ['MAY', '', 'dim'],
  ['JUN', '', 'dim'],
  ['JUL', '', 'dim'],
  ['AUG', '', 'dim'],
  ['SEP', '开学典礼', 'accent'],
  ['OCT', '迎新晚宴', 'strong'],
  ['NOV', '读书 № 01', ''],
  ['DEC', '期末 · 北大', '']
]

function CalendarRow({ year, months }: { year: number; months: string[][] }) {
  return (
    <div className="cal-row">
      <div className="y serif">
        <em>20</em>
        {String(year).slice(2)}
      </div>
      <div className="cal-track">
        {months.map(([month, event, tone]) => (
          <div
            className="cal-mo"
            data-tone={tone && tone !== 'dim' ? tone : undefined}
            key={`${year}-${month}`}
            style={tone === 'dim' ? { opacity: 0.3 } : undefined}
          >
            <span className="mo">{month}</span>
            {event ? <span className="ev">{event}</span> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export function AboutOverview(_props: { settings: SiteSettingsView }) {
  return (
    <main className="about-page">
      <header className="ab-cover" data-screen-label="06 About / Cover">
        <span className="label">班级 / About</span>
        <h1>
          HKU&nbsp;PKU EMBA
          <br />
          <em>8A-194</em> 班 · 35 人
        </h1>
        <p className="deck">
          2025 年秋入学，2027 年毕业。35 位同学由港大 (HKU) 与北大 (PKU) 联合培养。这卷档案，记录两校之间、两座城市之间的所有同行时刻。
        </p>
        <dl className="ab-meta">
          <div>
            <dt>Cohort · 届次</dt>
            <dd>HKU 8A · PKU 194</dd>
          </div>
          <div>
            <dt>Members · 同学</dt>
            <dd>35 位</dd>
          </div>
          <div>
            <dt>Cities · 城市分布</dt>
            <dd>北京 · 上海 · 深圳 · 香港 · 杭州</dd>
          </div>
          <div>
            <dt>Years · 在读</dt>
            <dd>2025 — 2027</dd>
          </div>
        </dl>
      </header>

      <section className="schools" data-screen-label="06 About / Two Schools">
        <div className="school">
          <div className="nm serif">
            香港大学 <em>HKU</em>
          </div>
          <div className="en">The University of Hong Kong</div>
          <span className="badge">港大编制 · 8A</span>
          <div className="role">上半学期 · H1</div>
          <p>香港 ·  薄扶林。「8A」即港大第八届 EMBA A 班。</p>
        </div>
        <div className="school-x">×</div>
        <div className="school right">
          <div className="nm serif">
            <em>PKU</em> 北京大学
          </div>
          <div className="en">Peking University</div>
          <span className="badge">北大编制 · 194</span>
          <div className="role">下半学期 · H2</div>
          <p>北京 · 朗润园。「194」是北大对应学期注册的班级序号。</p>
        </div>
      </section>

      <section className="ab-body" data-screen-label="06 About / Body">
        <div className="ab-portrait">
          <div className="ph" data-tone="3">
            <span className="ph-num">CLASS PORTRAIT</span>
            <span className="ph-cap">8A-194 班合影 / 港大百周年校园 / 2025.09</span>
          </div>
          <div className="credit">CLASS OF 2027 · GROUP PORTRAIT · HKU CENTENNIAL CAMPUS · SEP 2025</div>
        </div>
        <div className="ab-text">
          <h2 className="serif">
            35 个 <em>读书</em>、<em>走戈壁</em>、<em>做企业</em> 的人。
          </h2>
          <p>8A-194 班由港大与北大联合培养。同学们在两座城市间往返：从北京朗润园，到香港薄扶林。这种&quot;双校籍&quot;安排，让 35 位同学从入学第一天就习惯把&quot;远行&quot;作为一门必修课——也是这卷档案以两校并置为开篇的原因。</p>
          <p>关于 8A-194 的故事，最常被提起的有三件：即将出征的港大戈壁挑战赛 (戈21)、把读书会做成月度仪式、以及在公益上从筹款到落地的那条完整链路。三件事，构成了班级的精神底色，也构成了这座档案馆的三个立轴。</p>
          <h3 className="serif">关于这座馆</h3>
          <p>2026 年初，几位同学开始把朋友圈、群聊、公众号「8A-194 班」里散落的活动记录拢在一起。最初是 PDF，后来是 Notion，再后来——是这座小型的数字档案馆。它面向班级内部的同学，也欢迎外部的访客。域名 <span className="mono">hkupku8a194.com</span>。</p>
        </div>
      </section>

      <section className="mission" data-screen-label="06 About / Pillars">
        <div className="mission-inner">
          <span className="label">三件事 / Three Pillars</span>
          <h2>
            我们 <em>每年</em> 都做的事，
            <br />
            不过 <em>三件</em>。
          </h2>
          <div className="pillars">
            <div className="pillar">
              <span className="num">PILLAR · 01</span>
              <h3>读 / Reading</h3>
              <p>每月一期读书会。从《置身事内》到《市场与政府》，请教授到现场拆题，请同学带案例反驳。读书不为读书，为彼此的判断标准。</p>
            </div>
            <div className="pillar">
              <span className="num">PILLAR · 02</span>
              <h3>走 / Walking</h3>
              <p>每年一次戈壁。班级首征——「戈 21」于 2026 年 9 月在敦煌起跑，目前班内大部分同学已报名；A 队负责完赛，B 队负责啦啦与公益。121 公里之外，是 8A-194 与下一届彼此交接的&quot;路书&quot;。</p>
            </div>
            <div className="pillar">
              <span className="num">PILLAR · 03</span>
              <h3>做 / Building</h3>
              <p>每季度一次企业参访。字节、美的、招商局、中金……由同学带队、同学解读、同学复盘。做企业的人，到彼此的现场去看。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cal" data-screen-label="06 About / Calendar">
        <div className="cal-inner">
          <div className="cal-head">
            <h2 className="serif">
              两年 · <em>每月一卷</em> 的节奏
            </h2>
            <span className="label">YEARLY MAP · 2025 → 2027</span>
          </div>
          <CalendarRow year={2027} months={months2027} />
          <CalendarRow year={2026} months={months2026} />
          <CalendarRow year={2025} months={months2025} />
        </div>
      </section>

      <section className="editors" data-screen-label="06 About / Editors">
        <div className="editors-inner">
          <div>
            <span className="label">编辑部 / Archive Editors</span>
            <h2 className="serif">
              这座馆，
              <br />
              由 7 位同学维护。
            </h2>
            <p>
              编辑部由 8A-194 班同学自愿组成，分文字、影像、设计、技术 4 个组。所有归档由本班同学撰写、拍摄、剪辑、排版。投稿与勘误请见{' '}
              <Link className="linkline" href={siteRoutes.contact}>
                联系页
              </Link>
              ，或在公众号「8A-194 班」后台留言。
            </p>
          </div>
          <ul className="ed-list">
            <li><span className="role">总编 · Editor</span><span className="who">王某 <small>金融 / 北京</small></span></li>
            <li><span className="role">文字 · Words</span><span className="who">陈某 · 林某 <small>媒体 · 顾问</small></span></li>
            <li><span className="role">影像 · Image</span><span className="who">张某 · 周某 <small>影视 · 设计</small></span></li>
            <li><span className="role">设计 · Design</span><span className="who">李某 <small>品牌设计 / 上海</small></span></li>
            <li><span className="role">技术 · Tech</span><span className="who">赵某 <small>互联网 / 深圳</small></span></li>
          </ul>
        </div>
      </section>
    </main>
  )
}
