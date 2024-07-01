import React from 'react'
import { Message } from 'ai/react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

type Props = {
    messages: Message[];
    isLoading: boolean;
    isLoadingAIChat: boolean;
}

const LoadingDot = () => (
  <div className="loading-dot"></div>
)

const MessageLists = ({ messages, isLoading, isLoadingAIChat }: Props) => {

  // Loader when the whole page loads
  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingDot />
      </div>
    )
  }

  if (!messages) return null

  return (
    <div className="flex flex-col gap-2 px-2 m-2">
      {messages.map(message => (
        <div key={message.id} className={cn('flex', {
          'justify-end': message.role === 'user',
          'justify-start': message.role === 'assistant',
        })}>
          <div className={
            cn('rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10', {
              'bg-primary text-white': message.role === 'user',
              'bg-white text-primary': message.role === 'assistant',
            })
          }>
            <p>{message.content}</p>
          </div>
        </div>
      ))}
      {isLoadingAIChat && (
        <div className="flex justify-start">
          <div className="bg-gray-100 rounded-lg px-3 py-1 shadow-md ring-1 ring-gray-900/10">
            <LoadingDot />
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageLists
