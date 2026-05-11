import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { Activities } from './src/collections/Activities'
import { ExternalVideos } from './src/collections/ExternalVideos'
import { Media } from './src/collections/Media'
import { People } from './src/collections/People'
import { Users } from './src/collections/Users'
import { SiteSettings } from './src/globals/SiteSettings'
import { CMS_TITLE_SUFFIX, getDatabaseUrl, getPayloadSecret } from './src/lib/cms/admin'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    },
    meta: {
      titleSuffix: CMS_TITLE_SUFFIX
    },
    dateFormat: 'yyyy-MM-dd HH:mm'
  },
  collections: [Users, Media, People, ExternalVideos, Activities],
  globals: [SiteSettings],
  db: postgresAdapter({
    pool: {
      connectionString: getDatabaseUrl()
    }
  }),
  editor: lexicalEditor(),
  secret: getPayloadSecret(),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  }
})
