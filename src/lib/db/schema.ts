import { pgTable, serial, text, timestamp, varchar, integer, pgEnum } from "drizzle-orm/pg-core";


export const userSystemEnum = pgEnum('user_system_enum', ['system', 'user'])

// Schema for PDF Chats
export const pdfChats = pgTable('pdfChats', {
    id: serial('id').primaryKey(),
    pdfName: text('pdf_name').notNull(),
    pdfUrl: text('pdf_url').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    userId: varchar('user_id', {length:256}).notNull(),
    fileKey: text('file_key').notNull(),
});


// Schema for PDF Chat Messages
export const pdfChatMessages = pgTable('pdfChatMessages', {
    id: serial('id').primaryKey(),
    chatId: integer('chat_id').references(() => pdfChats.id).notNull(),  // Taking chatId reference from pdfChats id field
    content: text('content').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    role: userSystemEnum('role').notNull(),
})

