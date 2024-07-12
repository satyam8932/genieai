import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogIn } from "lucide-react";
import Link from "next/link";
import FileUpload from "../components/FileUpload";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";
import { pdfChats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId
  const isPro = await checkSubscription();
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(pdfChats).where(eq(pdfChats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center">
              <h1 className="mr-3 text-5xl font-bold">GenieAI</h1>
              <UserButton afterSignOutUrl="/" />
            </div>
            <div className="flex m-2 items-center justify-center">
              {isAuth && firstChat &&
                (
                  <Link href={`/chat/${firstChat.id}`}>
                    <Button>Go to Chats <ArrowRight className="ml-2" /></Button>
                  </Link>
                )}
              <div className="ml-3">
                {!userId ? (''): (<SubscriptionButton isPro={isPro} />)}
              </div>
            </div>
            <p className="max-w-xl mt-1 text-lg text-slate-600">
              Join millions of students, researchers, and professionals in the AI world to improve their research and business.
            </p>
            <div className="w-full mt-4 rounded-xl shadow-xl">
              {isAuth ?
                (<div className="p-4">
                  <FileUpload />
                </div>) :
                (
                  <Link href="/signin">
                    <Button>Login to get started!
                      <LogIn className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )
              }
              <div className="flex justify-center items-center w-full h-full p-4">
                <Image
                  src='/banner.png'
                  alt="Banner Image"
                  width={700}
                  height={600}
                  className="w-full max-w-[700px] h-auto rounded-xl border-gray-300"
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}