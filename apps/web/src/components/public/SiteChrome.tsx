'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Route } from 'next'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { siteRoutes } from '@/lib/site-routes'

const navigationItems = [
  { id: 'home', href: siteRoutes.home, zh: '首页', en: 'Index' },
  { id: 'activities', href: siteRoutes.activities, zh: '活动', en: 'Activities' },
  { id: 'gallery', href: siteRoutes.gallery, zh: '相册', en: 'Gallery' },
  { id: 'videos', href: siteRoutes.videos, zh: '影像', en: 'Videos' },
  { id: 'about', href: siteRoutes.about, zh: '班级', en: 'About' },
  { id: 'people', href: siteRoutes.people, zh: '人物', en: 'People' },
  { id: 'contact', href: siteRoutes.contact, zh: '联系', en: 'Contact' }
] satisfies Array<{ id: string; href: Route; zh: string; en: string }>

const footerLinkGroups = [
  {
    heading: '站点',
    items: navigationItems.slice(0, 4)
  },
  {
    heading: '档案',
    items: navigationItems.slice(4)
  }
] as const

interface SiteChromeProps {
  siteName: string
  footerNote?: string
  primaryEmail: string
  children: ReactNode
}

function isActiveRoute(pathname: string, href: Route) {
  const route = String(href)

  if (route === '/') {
    return pathname === route
  }

  return pathname === route || pathname.startsWith(`${route}/`)
}

function NavTime() {
  const [time, setTime] = useState('HK --:--')

  useEffect(() => {
    const update = () => {
      const formatted = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Hong_Kong'
      }).format(new Date())

      setTime(`HK ${formatted}`)
    }

    update()
    const timer = window.setInterval(update, 30 * 1000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <time className="nav-time" dateTime={time === 'HK --:--' ? undefined : time}>
      {time}
    </time>
  )
}

function useRevealOnScroll(pathname: string) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

    if (!elements.length) {
      return
    }

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [pathname])
}

export function SiteChrome({
  siteName,
  footerNote,
  primaryEmail,
  children
}: SiteChromeProps) {
  const pathname = usePathname()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useRevealOnScroll(pathname)

  useEffect(() => {
    setMobileNavOpen(false)
  }, [pathname])

  return (
    <div className="site-frame public-shell">
      <header className="nav">
        <div className="nav-inner">
          <Link className="brand" href={siteRoutes.home}>
            <span className="brand-mark">8A&nbsp;·&nbsp;194</span>
            <span className="brand-name">HKU&nbsp;PKU&nbsp;EMBA</span>
            <span className="brand-num">联合培养 · CLASS ARCHIVE</span>
          </Link>
          <button
            aria-controls="site-mobile-nav"
            aria-expanded={mobileNavOpen}
            aria-label={mobileNavOpen ? '关闭页面目录' : '打开页面目录'}
            className="nav-menu-toggle"
            onClick={() => setMobileNavOpen((open) => !open)}
            type="button"
          >
            <span>{mobileNavOpen ? 'Close' : 'Menu'}</span>
            <i aria-hidden="true" />
          </button>
          <nav
            className={mobileNavOpen ? 'nav-links open' : 'nav-links'}
            id="site-mobile-nav"
            aria-label="公开站导航"
          >
            {navigationItems.map((item) => {
              const active = isActiveRoute(pathname, item.href)

              return (
                <Link
                  aria-current={active ? 'page' : undefined}
                  className={active ? 'active' : undefined}
                  href={item.href}
                  key={item.id}
                  onClick={() => setMobileNavOpen(false)}
                >
                  <span>{item.zh}</span>
                  <span className="nav-link-en">{item.en}</span>
                </Link>
              )
            })}
          </nav>
          <div className="nav-cta">
            <NavTime />
          </div>
        </div>
      </header>

      <div className="site-frame__body">{children}</div>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-mast">
            <div className="mast-title serif">{siteName}</div>
            <div className="mast-sub">Digital Archive · Established 2026</div>
            <p className="mast-copy">
              港大 8A · 北大 194 联合培养，35 位同学。
              <br />
              {footerNote ?? '把零散的活动记忆，整理成可浏览、可传播、可长期沉淀的档案。'}
            </p>
          </div>

          {footerLinkGroups.map((group) => (
            <div key={group.heading}>
              <h4>{group.heading}</h4>
              <ul>
                {group.items.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href}>
                      {item.zh} · {item.en}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4>联系</h4>
            <ul>
              <li>
                <a href={`mailto:${primaryEmail}`}>{primaryEmail}</a>
              </li>
              <li>
                <Link href={siteRoutes.contact}>编辑部 · Editorial</Link>
              </li>
              <li>
                <Link href={siteRoutes.contact}>公众号「8A-194 班」</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025-2026 · HKU-PKU EMBA 8A-194 · 内部档案，仅供本班师生与友人</span>
          <span>hkupku8a194.com · v1.1 · 2026.05</span>
        </div>
      </footer>
    </div>
  )
}
