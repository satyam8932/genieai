'use client'

import { PDFChatType } from '@/lib/db/schema'
import React, { useState } from 'react'
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { Button } from './ui/button'
import { MessageCircle, Crown } from 'lucide-react'
import { cn } from '@/lib/utils'
import SubscriptionButton from './SubscriptionButton'

type Props = {
    chats: PDFChatType[];
    chatId: number;
    isPro: boolean;
}

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
    
    return (
        <>
            <div className="w-full h-screen overflow-hidden p-4 text-gray-200 bg-gray-900">
                <Link href='/'>
                    <Button className='w-full border-dashed border-white border'>
                        <PlusCircle className='mr-2 w-4 h-4' />
                        New Chat
                    </Button>
                </Link>
                <div className="flex flex-col gap-2 mt-2">
                    {chats.map((chat) => (
                        <Link href={`/chat/${chat.id}`} key={chat.id}>
                            <div className={cn('rounded-lg p-3 text-slate-300 flex items-center', {
                                'bg-violet-600 text-white': chat.id === chatId,
                                'hover:text-white duration-400 ease-in-out transition-colors': chat.id != chatId,
                            })}>
                                <MessageCircle className='m-2' />
                                <p className='w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis'>{chat.pdfName}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="absolute bottom-4 left-4">
                    <div className='flex items-center gap-2 text-sm text-slate-500 flex-wrap'>
                        <Link href='/' className='hover:text-violet-600'>Home</Link>
                        <Link href='/' className='hover:text-violet-600'>Source</Link>
                        {/* Stripe Button */}
                        {/* Using disabled button to prevent users from making multiple request to the stripe server causing issues */}
                        <SubscriptionButton isPro={isPro} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatSideBar
