import { db } from '@/lib/db'
import { pdfChats } from '@/lib/db/schema'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'
import ChatSideBar from '@/components/ChatSideBar'
import PDFViewer from '@/components/PDFViewer'
import ChatComponent from '@/components/ChatComponent'

type Props = {
    params: {
        chatId: string,
    }
}

const ChatPage = async ({ params: { chatId } }: Props) => {
    const { userId } = await auth();
    if (!userId) return redirect('/signin');

    const chats = await db.select().from(pdfChats).where(eq(pdfChats.userId, userId));

    if (!chats) return redirect('/');

    if (!chats.find(chat => chat.id === parseInt(chatId))) {
        return redirect('/');
    };

    const currentChat = chats.find(chat => chat.id === parseInt(chatId));

    return (
        <div className="flex max-h-screen overflow-scroll">
            <div className="flex w-full max-h-screen overflow-scroll">
                {/* chat sidebar */}
                <div className="flex-[1] max-w-xs">
                    <ChatSideBar chats={chats} chatId={parseInt(chatId)} />
                </div>
                {/* pdf viewer */}
                <div className="max-h-screen p-4 oveflow-scroll flex-[5]">
                    <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
                </div>
                {/* chat component */}
                <div className="flex-[3] border-l-4 border-l-slate-200">
                    <ChatComponent chatId={parseInt(chatId)} />
                </div>
            </div>
        </div>
    );
};

export default ChatPage