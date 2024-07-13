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
    const { userId } = await auth();
    const isAuth = !!userId;
    let userChats: PDFChat[] = [];
    if (userId) {
        userChats = await db.select().from(pdfChats).where(eq(pdfChats.userId, userId));
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1 p-4 md:px-8 md:py-12">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">DocBot</h1>
                    <p className='text-sm text-center text-slate-400'>Upload a file to create a chat!</p>
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
                                src="/nochats.svg" // Path to your SVG file in the public folder
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
