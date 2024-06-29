// /api/create-chat/route.ts

import { db } from "@/lib/db";
import { pdfChats } from "@/lib/db/schema";
import { loadFirebaseIntoPinecone } from "@/lib/pinecone";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define the request body interface
interface CreateChatRequestBody {
    fileKey: string;
    fileName: string;
}

// Helper function to validate the request body
const validateRequestBody = (body: any): body is CreateChatRequestBody => {
    return body && typeof body.fileKey === 'string' && typeof body.fileName === 'string';
};

export async function POST(req: Request) {
    try {
        // Authenticate user
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Parse request body
        const body = await req.json();
        if (!validateRequestBody(body)) {
            console.error("Invalid request body:", body);
            return NextResponse.json(
                { error: "Bad Request: Missing or invalid parameters" },
                { status: 400 }
            );
        }
        
        const { fileKey, fileName } = body;

        // Check environment variables
        const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
        if (!storageBucket) {
            throw new Error('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET is not set in the environment variables');
        }

        const pineconeIndexName = process.env.PINECONE_INDEX;
        if (!pineconeIndexName) {
            throw new Error('PINECONE_INDEX is not set in the environment variables');
        }

        // Load the PDF into Pinecone
        await loadFirebaseIntoPinecone(fileKey);

        // Insert into `pdfChats` table and get the newly created record
        const [pdfChat] = await db.insert(pdfChats).values({
            pdfName: fileName,
            pdfUrl: `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${fileKey}?alt=media`,
            fileKey: fileKey,
            userId: userId,
        }).returning({
            id: pdfChats.id
        });

        // Return the inserted `pdfChat` record
        return NextResponse.json({ pdfChatId: pdfChat.id }, { status: 201 });

    } catch (err) {
        console.error("Error creating chat:", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
