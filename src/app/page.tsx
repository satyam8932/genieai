// pages/index.tsx
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { LogIn, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/ui/faq";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/SubscriptionButton";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  const isPro = await checkSubscription();

  return (
    <>
      <Navbar isAuth={isAuth} />

      {/* Background SVG */}
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
          <ellipse rx="18.75%" ry="18.75%" cx="31.43%" cy="35.79%" fill="hsl(37, 99%, 67%)"></ellipse>
          <ellipse rx="18.75%" ry="18.75%" cx="51.88%" cy="67.76%" fill="hsl(316, 73%, 52%)"></ellipse>
          <ellipse rx="18.75%" ry="18.75%" cx="69.56%" cy="33.57%" fill="hsl(185, 100%, 57%)"></ellipse>
        </g>
      </svg>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="m-3 text-5xl font-bold">GenieAI</h1>
        <p className="max-w-xl mt-1 text-lg text-slate-600">
          Join millions of students, researchers, and professionals in the AI world to improve their research and business.
        </p>

        <div className="flex mt-2 space-x-3">
          {isAuth ? (
            <Link href="/dashboard">
              <Button>
                Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          ) : (
            <Link href="/signin">
              <Button>
                Login to get started!
                <LogIn className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
          {isAuth && <SubscriptionButton isPro={isPro} />}
        </div>

        {/* Video Demo */}
        <div className="flex justify-center w-full p-4 mt-4">
          <video
            src="/genieai demo.mp4" // Update the path to your video file
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-[700px] h-auto rounded-xl border-gray-300"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="h-screen">
        <Pricing />
      </div>

      {/* FAQ Section with Mobile Distinct Styling */}
      <section className="mt-96 md:mt-0">
        <FAQ />
      </section>

      {/* Footer */}
      <div className="mt-96 md:mt-0">
        <Footer />
      </div>
    </>
  );
}
