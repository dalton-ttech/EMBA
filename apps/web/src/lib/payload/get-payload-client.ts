import { cache } from 'react'
import net from 'node:net'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { env } from '@/lib/env'

export const getPayloadClient = cache(async () => getPayload({ config: configPromise }))

export const isPayloadDatabaseReachable = cache(async () => {
  if (!env.databaseUrl) {
    return false
  }

  try {
    const url = new URL(env.databaseUrl)
    const host = url.hostname
    const port = Number(url.port || '5432')

    return await new Promise<boolean>((resolve) => {
      const socket = net.createConnection({ host, port })

      const finalize = (reachable: boolean) => {
        socket.removeAllListeners()
        socket.destroy()
        resolve(reachable)
      }

      socket.setTimeout(350)
      socket.once('connect', () => finalize(true))
      socket.once('timeout', () => finalize(false))
      socket.once('error', () => finalize(false))
    })
  } catch {
    return false
  }
})
