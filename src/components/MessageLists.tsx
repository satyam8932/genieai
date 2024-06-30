import React from 'react'
import { Message } from 'ai/react'
import { cn } from '@/lib/utils'

type Props = {
    messages: Message[]
}

const MessageLists = ({messages}: Props) => {
  if(!messages) return <></>
  return (
    <>
      <div className="flex flex-col gap-2 px-2">
        {messages.map(message => {
          return (
            <div key={message.id} className={cn('flex', {
              'justify-end': message.role ==='user',
              'justify-start': message.role ==='assistant',
            })}>
              <div className={
                cn('rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10', {
                  'bg-violet-600 text-white': message.role ==='user',
                  
                })
              }>
                <p>{message.content}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default MessageLists
