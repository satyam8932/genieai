import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogIn } from "lucide-react";
import Link from "next/link";


export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId

  return (
    <>
      <div className="w-screen min-h-screen bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center">
              <h1 className="mr-3 text-5xl font-semibold">ChatWithPDF</h1>
              <UserButton afterSignOutUrl="/" />
            </div>
            <div className="flex mt-2">
              {isAuth && <Button>Go to Chats</Button>}
            </div>
            <p className="max-w-xl mt-1 text-lg text-slate-600">
              Join millions of students, researchers, and professionals in the AI world to improve their research and business.
            </p>
            <div className="w-full mt-4">
              {isAuth ?
                (<h1>Testf</h1>) :
                (
                  <Link href="/signin">
                    <Button>Login to get started!
                      <LogIn className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}