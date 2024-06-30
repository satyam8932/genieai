import { pgTable, serial, text, timestamp, varchar, integer, pgEnum } from "drizzle-orm/pg-core";

// Enum for user roles: 'system' or 'user'
export const userSystemEnum = pgEnum('user_system_enum', ['system', 'user'])

// Schema for PDF Chats
export const pdfChats = pgTable('pdfChats', {
    id: serial('id').primaryKey(),  // Auto-incrementing primary key
    pdfName: text('pdf_name').notNull(),  // Name of the PDF file
    pdfUrl: text('pdf_url').notNull(),  // URL where the PDF is stored
    createdAt: timestamp('created_at').notNull().defaultNow(),  // Timestamp for when the chat was created
    userId: varchar('user_id', {length:256}).notNull(),  // ID of the user who created the chat
    fileKey: text('file_key').notNull(),  // Unique key for the uploaded file
});

export type PDFChatType = typeof pdfChats.$inferInsert;

// Schema for PDF Chat Messages
export const pdfChatMessages = pgTable('pdfChatMessages', {
    id: serial('id').primaryKey(),  // Auto-incrementing primary key
    chatId: integer('chat_id').references(() => pdfChats.id).notNull(),  // Reference to the related PDF chat
    content: text('content').notNull(),  // Content of the chat message
    createdAt: timestamp('created_at').notNull().defaultNow(),  // Timestamp for when the message was created
    role: userSystemEnum('role').notNull(),  // Role of the message sender ('system' or 'user')
})

// Schema for User Subscriptions
export const userSubcriptions = pgTable('userSubcriptions', {
    id: serial('id').primaryKey(),  // Auto-incrementing primary key
    userId: varchar('user_id', {length:256}).notNull().unique(),  // Unique ID of the user
    stripeCustomerId: varchar('stripe_customer_id', {length:256}).notNull().unique(),  // Stripe customer ID
    stripeSubscriptionId: varchar('stripe_subscription_id', {length:256}).notNull().unique(),  // Stripe subscription ID
    stripePriceId: varchar('stripe_price_id', {length:256}),  // Stripe price ID for the subscription
    stripeCurrentPeriodEnd: timestamp('stripe_current_period_end'),  // End date for the current subscription period
});
