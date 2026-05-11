import type { Route } from 'next'

export const siteRoutes = {
  home: '/' as Route,
  activities: '/activities' as Route,
  videos: '/videos' as Route,
  gallery: '/gallery' as Route,
  about: '/about' as Route,
  people: '/people' as Route,
  contact: '/contact' as Route,
  activity: (slug: string) => `/activities/${slug}` as Route
}
