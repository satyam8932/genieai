import FileUpload from '@/components/FileUpload';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { pdfChats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { auth } from '@clerk/nextjs/server';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

type PDFChat = {
    id: number;
    pdfName: string;
    pdfUrl: string;
    createdAt: Date;
    userId: string;
    fileKey: string;
};

const Page = async () => {
    const { userId } = auth();
    const isAuth = !!userId;
    let userChats: PDFChat[] = [];
    if (userId) {
        userChats = await db.select().from(pdfChats).where(eq(pdfChats.userId, userId));
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar isAuth={isAuth} />
            <main className="flex-1 p-4 md:px-8 md:py-12">
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
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">DocBot</h1>
                    <p className='text-md text-center text-slate-400'>Upload a file to create a chat!</p>
                    <FileUpload />
                    {isAuth && userChats.length > 0 ?
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">Created Chats</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chat Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {userChats.map((pdf) => (
                                            <tr key={pdf.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{pdf.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{pdf.pdfName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{pdf.createdAt.toLocaleString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Link href={`docbot/${pdf.id}`}>
                                                        <Button>
                                                            <ArrowRight />
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col items-center justify-center mt-8">
                            <Image
                                src="/noimages.svg" // Path to your SVG file in the public folder
                                alt="No Chats Found" // Alt text for accessibility
                                width={300} // Width of the SVG (adjust as needed)
                                height={300} // Height of the SVG (adjust as needed)
                            />
                        </div>
                    }
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Page;
