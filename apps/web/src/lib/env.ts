export const env = {
  databaseUrl: process.env.DATABASE_URL,
  payloadSecret: process.env.PAYLOAD_SECRET,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
}
