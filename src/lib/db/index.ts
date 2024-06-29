import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

if (!process.env.DATABASE_URL) {
    throw new Error('Database URL not found')
}

const SQL = neon(process.env.DATABASE_URL)

export const db = drizzle(SQL, { schema });