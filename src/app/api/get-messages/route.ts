import { pdfChatMessages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime ='edge';  // Using edge runtime to speed up drizzle message fetching

export const POST = async (req: Request) => {
    const {chatId } = await req.json();
    const _pdfChatMessage = await db.select().from(pdfChatMessages).where(eq(pdfChatMessages.chatId, chatId));
    
    return NextResponse.json(_pdfChatMessage, {status: 200});  // Return the messages 
}