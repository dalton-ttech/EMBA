export const CMS_NAME = 'EMBA 班级活动档案馆'
export const CMS_TITLE_SUFFIX = ` - ${CMS_NAME}后台`

export const CMS_COLLECTION_GROUPS = {
  content: '内容资料库',
  settings: '站点设置',
  system: '系统管理'
} as const

function requiresStrictEnvironment() {
  return process.env.EMBA_STRICT_ENV === 'true' || process.env.VERCEL_ENV === 'production'
}

export function getPayloadSecret() {
  const secret = process.env.PAYLOAD_SECRET?.trim()

  if (secret) {
    return secret
  }

  if (requiresStrictEnvironment()) {
    throw new Error('PAYLOAD_SECRET is required when EMBA_STRICT_ENV=true or VERCEL_ENV=production.')
  }

  return 'development-only-payload-secret'
}

export function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL?.trim()

  if (databaseUrl) {
    return databaseUrl
  }

  if (requiresStrictEnvironment()) {
    throw new Error('DATABASE_URL is required when EMBA_STRICT_ENV=true or VERCEL_ENV=production.')
  }

  return ''
}
