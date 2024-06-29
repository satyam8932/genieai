// drizzle.config.ts

import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export default defineConfig({
    dialect: 'postgresql',  // PostgreSQL as the database dialect
    schema: './src/lib/db/schema.ts',  // Path to the schema files
    dbCredentials: {
        url: process.env.DATABASE_URL || '',  // PostgreSQL database URL from environment variables
    }
});
