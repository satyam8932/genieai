"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Message } from "ai";
import MessageLists from "./MessageLists";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Crown, Loader, Send, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { UserButton } from "@clerk/nextjs";

type Props = {
  chatId: number;
  isPro: boolean;
};

const ChatComponent = ({ chatId, isPro }: Props) => {
  const [model, setModel] = React.useState("gpt-3.5-turbo");
  const [deleting, setDeletingButton] = React.useState(false);
  // For deleting Chat messages
  const router = useRouter();
  
  const handleDeleteChat = async () => {
    try {
      setDeletingButton(true);
      await axios.delete("/api/delete-chat", {
        data: { chatId: chatId.toString() }
      });
      toast.success("Chat deleted successfully");
      router.push("/docbot");
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast.error("Failed to delete chat");
    }
  };

  // For fetching Messages from DB
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", { chatId });
      return response.data;
    },
  });

  // For sending query to ChatGPT
  const { input, handleInputChange, handleSubmit, messages, isLoading: isLoadingAIChat } = useChat({
    api: "/api/chat",
    body: {
      chatId, // chat id
      model,  // chatgpt model
    },
    initialMessages: data || [],
  });

  // Update message count
  const [messageCount, setMessageCount] = React.useState<number>(0);

  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  React.useEffect(() => {
    if (data) {
      setMessageCount(100 - data.length); // Example logic for remaining messages
    }
  }, [data]);

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit flex justify-between items-center ">

        {/* Homepage */}

        <Link href={"/"}>
          <h3 className="font-bold flex flex-row items-center text-sm lg:text-xl">
            <Image src="/logo.png" alt="logo" width={30} height={20} className="mr-2" />
            <span className="hidden lg:flex">Chat With PDF</span>
          </h3>
        </Link>

        {/* Model Selector */}
        <div className="flex items-center">
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-[130px] text-sm sm:w-[130px] sm:text-base focus:outline-none focus:ring-0">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-3.5-turbo" >GPT-3.5</SelectItem>
              <SelectItem value="gpt-4" disabled={!isPro}>
                <div className="flex items-center justify-between w-full">
                  <span>GPT-4</span>
                  <Crown className="ml-2 h-3 w-3 sm:ml-1 sm:h-4 sm:w-4" />
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Messages Counter */}
        <div className="flex items-center">
          <Button className="bg-primary bg-yellow-400 mr-2 text-primary hover:bg-yellow-500">
            {isPro ? (
              <><span className="md:flex hidden mr-2">Pro User </span><Crown className="h-4 w-4" /> </>
            ):(<>Tokens {messageCount}</>)}
          </Button>
          {/* User Management */}
          <UserButton afterSignOutUrl="/" />
        </div>


      </div>
          
      <hr />

      {/* End of Header */}
      
      {/* Chat Area */}

      <div className="flex-1 overflow-y-auto bg-zinc-50" id="message-container">
        <MessageLists messages={messages} isLoading={isLoading} isLoadingAIChat={isLoadingAIChat} />
      </div>

      <form onSubmit={handleSubmit} className="px-2 py-4 bg-white border focus:outline-none">
        <div className="flex">

          {/* Delete chat button */}
          <Button id="deleteChatButton" className="bg-yellow-400 mr-2 text-primary hover:bg-yellow-500" type="button" title="Delete Chat" disabled={isLoadingAIChat} onClick={handleDeleteChat}>
            {!deleting && <Trash2 className="h-4 w-4" />}
            {deleting && <Loader className="h-4 w-4" />}
          </Button>
          
          {/* USER input messages */}
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question..."
            className="w-full focus:outline-none focus:ring-0"
          />
          
          {/* Message send button */}
          <Button className="bg-primary ml-2" disabled={isLoadingAIChat}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
