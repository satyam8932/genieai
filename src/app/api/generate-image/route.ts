import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from 'openai-edge';

// Initialize OpenAI API client with your API key from environment variables
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

interface GenerateImageRequestBody {
    prompt: string;
}

// Helper function to validate the request body structure
const validateRequestBody = (body: any): body is GenerateImageRequestBody => {
    return body && typeof body.prompt === 'string';
};

export async function POST(req: Request) {
    try {
        // Authenticate the user and extract userId
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }  // Return 401 status if user is not authenticated
            );
        }

        // Parse and validate the request body
        const body = await req.json();
        if (!validateRequestBody(body)) {
            console.error('Invalid request body:', body);
            return NextResponse.json(
                { error: 'Bad Request: Missing or invalid parameters' },
                { status: 400 }  // Return 400 status for invalid request body
            );
        }

        const { prompt } = body;
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });

        // Parse the response as JSON
        const result = await response.json();
        const image_url = result.data[0].url;

        // Return the image URL in the response
        return NextResponse.json({ image_url }, {status: 200});

    } catch (error) {
        console.error('Error generating image:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}