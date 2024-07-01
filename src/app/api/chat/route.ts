import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { getContext } from '@/lib/context';
import { db } from '@/lib/db';
import { pdfChats, pdfChatMessages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { Message } from 'ai/react';

// Initialize OpenAI API client with your API key from environment variables
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

/**
 * Handle POST requests for streaming chat completions.
 * @param req - The HTTP request object.
 * @returns A StreamingTextResponse with the AI-generated response.
 */
export async function POST(req: Request) {
    try {
        // Parse the incoming request JSON payload
        const { messages, chatId, model } = await req.json();

        // Fetch the chat details from the database
        const chats = await db.select().from(pdfChats).where(eq(pdfChats.id, chatId));

        // Return 404 if the chat is not found
        if (chats.length !== 1) {
            return NextResponse.json({ error: "Chat not Found", status: 404 });
        }

        // Get the file key for the chat
        const fileKey = chats[0].fileKey;
        const lastMessage = messages[messages.length - 1];

        // Retrieve the context for the last message
        const context = await getContext(lastMessage.content, fileKey);

        // Define the system prompt for the AI model
        const prompt = {
            role: 'system',
            content: `
            You are an advanced AI assistant with expert knowledge, helpfulness, cleverness, and articulateness. You are well-behaved, well-mannered, and always respond pleasantly.
            CONTEXT:
            ${context}
            END CONTEXT

            Guidelines:
            1. Analyze each question carefully before responding.
            2. If the question is in a specific language, respond in the same language.
            3. Provide accurate and helpful answers based on the given context and your knowledge.
            4. If you're unsure or don't have enough information to answer confidently, say: "I'm sorry, but I don't have enough information to answer that question accurately."
            5. If the question is completely unrelated to the given context or beyond your capabilities, respond with: "I'm sorry, but I don't know the answer to that question."
            6. Always maintain a polite and professional tone in your responses.
            7. If appropriate, offer related information or ask clarifying questions to better assist the user.

            Remember, your goal is to provide the most helpful and accurate response possible while acknowledging your limitations when necessary.
            `
        };

        // Create a chat completion request with streaming enabled
        const response = await openai.createChatCompletion({
            model: model,
            messages: [
                prompt, 
                ...messages.filter((message: Message) => message.role === 'user')  // Filter messages to include only user messages
            ],
            stream: true,  // Enable streaming for the response
        });

        // Define a stream to handle AI responses and database updates
        const stream = OpenAIStream(response, {
            onStart: async () => {
                // Save the user's message to the database
                await db.insert(pdfChatMessages).values({
                    chatId: chatId,
                    content: lastMessage.content,
                    role: 'user',
                });
            },
            onCompletion: async (completion) => {
                // Save the AI's message to the database
                await db.insert(pdfChatMessages).values({
                    chatId: chatId,
                    content: completion,
                    role: 'system',
                });
            },
        });

        // Return the streaming response
        return new StreamingTextResponse(stream);

    } catch (error) {
        console.error('Error:', error);
        return new Response('An error occurred', { status: 500 });
    }
}
