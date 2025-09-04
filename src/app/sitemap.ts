import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const routes = ['', '/rooms', '/dining', '/offers', '/gallery', '/contact', '/booking']
  const now = new Date().toISOString()
  return routes.map((r) => ({ url: `${base}${r}`, lastModified: now }))
}


