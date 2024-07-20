import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button"
import React from 'react'

import { auth } from '@clerk/nextjs/server';
import ImageGenerator from '@/components/ImageGenerator';


type Props = {}

const ArtSynth = (props: Props) => {
    const { userId } = auth()
    const isAuth = !!userId;

    return (
        <>
            <Navbar isAuth={isAuth} />
            <main className="flex-1 p-4 md:px-8 md:py-12 h-screen">
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

                {/* Main Content */}

                <div className="max-w-3xl mx-auto flex flex-col">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">ArtSynth</h1>
                    <p className='text-sm text-center text-slate-400'>Unleash your creativity with the power of ArtSynth!</p>
                    <div className="mt-8">
                        <ImageGenerator />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default ArtSynth;