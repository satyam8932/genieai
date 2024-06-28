import { neon, neonConfig } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/better-sqlite3'

// Catching the connection
neonConfig.fetchConnectionCache = true

if (!process.env.DATABASE_URL) {
    throw new Error('Database URL not found')
}

const SQL = neon(process.env.DATABASE_URL)

export const db = drizzle(SQL);