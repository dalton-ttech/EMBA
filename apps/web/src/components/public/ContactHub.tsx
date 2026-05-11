import Link from 'next/link'
import type { SiteSettingsView } from '@/types/site-content'
import { siteRoutes } from '@/lib/site-routes'
import { ContactEmailForm } from './ContactEmailForm'

export function ContactHub({ settings }: { settings: SiteSettingsView }) {
  return (
    <main className="contact-page">
      <header className="ch" data-screen-label="08 Contact / Header">
        <span className="label">联系 / Contact</span>
        <h1 className="serif">
          写信给 <em>编辑部</em>，
          <br />
          或扫一扫加入。
        </h1>
        <p className="lede">
          同班同学、来访嘉宾、合作机构皆可。我们读每一封信，并由编辑部 7 日内回复。
        </p>
      </header>

      <section className="contact-body" data-screen-label="08 Contact / Body">
        <ContactEmailForm
          note={settings.contact.newsletterNote}
          targetEmail={settings.contact.primaryEmail}
        />

        <aside className="side">
          <h2 className="serif">编辑部 / Editor&apos;s Desk</h2>
          <ul>
            <li>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${settings.contact.primaryEmail}`}>{settings.contact.primaryEmail}</a>
                <small>来信进入编辑部共享邮箱</small>
              </dd>
            </li>
            <li>
              <dt>Press</dt>
              <dd>
                <a href={`mailto:${settings.contact.primaryEmail}`}>{settings.contact.primaryEmail}</a>
                <small>媒体 / 合作 / 转载</small>
              </dd>
            </li>
            <li>
              <dt>Address</dt>
              <dd>
                香港 · 港大百周年校园 / 北京 · 朗润园
                <small>港大 8A · 北大 194 · 联合培养</small>
              </dd>
            </li>
            <li>
              <dt>Domain</dt>
              <dd>
                hkupku8a194.com
                <small>本站域名 · This archive</small>
              </dd>
            </li>
            <li>
              <dt>WeChat</dt>
              <dd>
                公众号「8A-194 班」
                <small>同步发布每期归档</small>
              </dd>
            </li>
          </ul>
          <div className="qr">
            <div className="qr-stage" aria-hidden="true" />
            <div className="qr-text">
              <h3 className="serif">公众号「8A-194 班」</h3>
              <small>WeChat Official · Subscribe</small>
              <p>关注后即可收到每期归档推送。如需联系编辑部，请在公众号后台留言，编辑部当日回复。</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="end" data-screen-label="08 Contact / End">
        <h2 className="serif">
          这卷档案，
          <br />
          因 <em>你的一封信</em>，
          <br />
          会更厚一点。
        </h2>
        <div>
          <span className="label">END / 卷末</span>
          <p>
            如果你曾在 8A-194 的某次活动中出现过——一张照片、一个发言、一段对话——欢迎来信认领或更正。
          </p>
          <Link className="arrow-link" href={siteRoutes.activities}>
            回到归档 / Back to archive <span className="arr">→</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
