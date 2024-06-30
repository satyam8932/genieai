"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { Message } from "ai";
import MessageLists from "./MessageLists";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

type Props = { chatId: number };


const ChatComponent = ({ chatId }: Props) => {
  
  // For fetching Messages from DB
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {chatId});
      return response.data;
    },
  })
  
  // For sending query to ChatGPT
  const { input, handleInputChange, handleSubmit, messages, isLoading : isLoadingAIChat} = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });

  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
        <Link href={'/'}><h3 className="text-2xl font-bold">Chat With PDF</h3></Link>
      </div>
      <hr />
      <div className="flex-1 overflow-y-auto" id="message-container">
        <MessageLists messages={messages} isLoading={isLoading} isLoadingAIChat={isLoadingAIChat} />
      </div>

      <form onSubmit={handleSubmit} className="px-2 py-4 bg-white border focus:outline-none">
        <div className="flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question..."
            className="w-full outline-none bg-transparent"
          />
          <Button className="bg-violet-600 ml-2" disabled={isLoadingAIChat}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;