'use client'

import { PDFChatType } from '@/lib/db/schema'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { PlusCircle, MessageCircle } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import SubscriptionButton from './SubscriptionButton'
import { useTheme } from 'next-themes'

type Props = {
    chats: PDFChatType[];
    chatId: number;
    isPro: boolean;
}

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
    const {systemTheme, theme, setTheme} = useTheme();
    const currentTheme = theme === "dark" ? systemTheme : theme;
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
      if(currentTheme==='dark'){
        setDarkMode(true);
      }
      else{
        setDarkMode(false);
      }
    },[currentTheme])
  
    // console.log(themeCheck)
    // console.log(darkMode)
    return (
        <div className={`w-full h-screen flex flex-col overflow-hidden p-4 ${darkMode ? "text-white bg-black" : "text-gray-200 bg-white"} `}>
            <Link href='/docbot'>
                <Button className='w-full border border-dashed'>
                    <PlusCircle className='mr-2 w-4 h-4' />
                    New Chat
                </Button>
            </Link>
            <div className="flex-grow overflow-y-auto mt-2">
                <div className="flex flex-col gap-2">
                    {chats.map((chat) => (
                        <Link href={`/docbot/${chat.id}`} key={chat.id}>
                            <div className={cn('rounded-lg p-3 h-10 text-slate-300 dark:text-slate-900 flex items-center', {
                                'bg-zinc-100 text-primary font-semibold': chat.id === chatId,
                                'hover:bg-zinc-100 text-primary duration-400 ease-in-out transition-colors': chat.id != chatId,
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