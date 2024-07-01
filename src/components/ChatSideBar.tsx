'use client'

import { PDFChatType } from '@/lib/db/schema'
import React from 'react'
import Link from 'next/link'
import { PlusCircle, MessageCircle } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import SubscriptionButton from './SubscriptionButton'

type Props = {
    chats: PDFChatType[];
    chatId: number;
    isPro: boolean;
}

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
    return (
        <div className="w-full h-screen flex flex-col overflow-hidden p-4 text-gray-200 bg-white">
            <Link href='/'>
                <Button className='w-full border-dashed border-white border'>
                    <PlusCircle className='mr-2 w-4 h-4' />
                    New Chat
                </Button>
            </Link>
            <div className="flex-grow overflow-y-auto mt-2">
                <div className="flex flex-col gap-2">
                    {chats.map((chat) => (
                        <Link href={`/chat/${chat.id}`} key={chat.id}>
                            <div className={cn('rounded-lg p-3 text-slate-300 flex items-center', {
                                'bg-zinc-100 text-primary font-semibold': chat.id === chatId,
                                'text-primary duration-400 ease-in-out transition-colors': chat.id != chatId,
                            })}>
                                <MessageCircle className='m-2' />
                                <p className='w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis'>{chat.pdfName}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="mt-auto pt-4 flex justify-center">
                <SubscriptionButton isPro={isPro} />
            </div>
        </div>
    )
}

export default ChatSideBar