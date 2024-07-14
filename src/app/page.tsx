import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId
  const isPro = await checkSubscription();
  return (
    <>
      <Navbar isAuth={isAuth} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        style={{ zIndex: -1 }}
        opacity="0.46"
      >
        <defs>
          <filter
            id="bbblurry-filter"
            x="-100%"
            y="-100%"
            width="400%"
            height="400%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              stdDeviation="112"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="SourceGraphic"
              edgeMode="none"
              result="blur"
            ></feGaussianBlur>
          </filter>
        </defs>
        <g filter="url(#bbblurry-filter)">
          <ellipse
            rx="18.75%"
            ry="18.75%"
            cx="31.43%"
            cy="35.79%"
            fill="hsl(37, 99%, 67%)"
          ></ellipse>
          <ellipse
            rx="18.75%"
            ry="18.75%"
            cx="51.88%"
            cy="67.76%"
            fill="hsl(316, 73%, 52%)"
          ></ellipse>
          <ellipse
            rx="18.75%"
            ry="18.75%"
            cx="69.56%"
            cy="33.57%"
            fill="hsl(185, 100%, 57%)"
          ></ellipse>
        </g>
      </svg>

      {/* main content */}
      <div className="min-h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center">
              <h1 className="m-3 text-5xl font-bold">GenieAI</h1>
            </div>
            <div className="flex m-2 items-center justify-center">
              {isAuth &&
                (
                  <Link href={`/dashboard`}>
                    <Button>Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" /></Button>
                  </Link>
                )}
              <div className="ml-3">
                {!userId ? ('') : (<SubscriptionButton isPro={isPro} />)}
              </div>
            </div>
            <p className="max-w-xl mt-1 text-lg text-slate-600">
              Join millions of students, researchers, and professionals in the AI world to improve their research and business.
            </p>
            <div className="w-full mt-4 rounded-xl shadow-xl">
              {isAuth ?
                ('') :
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
      <div className="mb-96 md:mb-0">
      <Pricing />
      </div>
      <Footer />
    </>
  )
}