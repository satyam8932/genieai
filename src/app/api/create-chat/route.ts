//  /api/create-chat

import { loadFirebaseIntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        const { fileKey, fileName } = body;
        const docs = await loadFirebaseIntoPinecone(fileKey)
        return NextResponse.json(
            { docs },
        );

    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}