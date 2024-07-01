import { db } from '@/lib/db';
import { pdfChats, pdfChatMessages } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

interface DeleteChatRequestBody {
    chatId: string;
}

const validateRequestBody = (body: any): body is DeleteChatRequestBody => {
    return body && typeof body.chatId === 'string';
};

export async function DELETE(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        if (!validateRequestBody(body)) {
            console.error('Invalid request body:', body);
            return NextResponse.json({ error: 'Bad Request: Missing or invalid parameters' }, { status: 400 });
        }

        const { chatId } = body;
        const chatIdNumber = parseInt(chatId, 10);

        if (isNaN(chatIdNumber)) {
            return NextResponse.json({ error: 'Invalid chat ID' }, { status: 400 });
        }

        // Delete associated messages
        await db.delete(pdfChatMessages)
            .where(eq(pdfChatMessages.chatId, chatIdNumber));

        // Delete the chat
        const result = await db.delete(pdfChats)
            .where(eq(pdfChats.id, chatIdNumber))
            .returning({ id: pdfChats.id });

        if (result.length === 0) {
            return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Chat and associated messages deleted successfully' }, { status: 200 });

    } catch (err) {
        console.error('Error deleting chat:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}