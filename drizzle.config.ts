import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

// Configuration for drizzle ORM, where it has to look for schema files
export default defineConfig({
    dialect: 'postgresql',                   // What database we are using
    schema: './src/lib/db/schema.ts',        // Destination for schema files
    dbCredentials: {
        url: process.env.DATABASE_URL || '', // Database URL
    }
});