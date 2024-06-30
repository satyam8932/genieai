import { neon } from '@neondatabase/serverless' // Import the neon function to initialize a Neon database connection
import { drizzle } from 'drizzle-orm/neon-http' // Import the drizzle function to create a Drizzle ORM instance with Neon HTTP support
import * as schema from './schema' // Import the schema from the local schema file

// Check if the DATABASE_URL environment variable is set
if (!process.env.DATABASE_URL) {
    // Throw an error if DATABASE_URL is not found. This ensures that the application does not proceed without a database connection URL.
    throw new Error('Database URL not found')
}

// Initialize the Neon SQL client with the database URL from the environment variables
// The neon function creates a connection to the Neon database using the provided DATABASE_URL
const SQL = neon(process.env.DATABASE_URL)

// Create the Drizzle ORM instance with the Neon SQL client and the schema
// `drizzle` function sets up the ORM to interact with the Neon database using the schema defined in the `./schema` file
export const db = drizzle(SQL, { schema })
