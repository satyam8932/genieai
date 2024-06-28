import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const pdfChats = pgTable('pdfChats', {
    id: serial('id').primaryKey(),
    pdfName: text('pdf_name').notNull(),
    pdfUrl: text('pdf_url').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    userId: variable('user_id').notNull,
});
