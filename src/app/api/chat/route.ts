import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// Streaming Responses 
export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages,
            stream: true,
        });

        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);

    } catch (error) {
        console.error('Error:', error);
        return new Response('An error occurred', { status: 500 });
    }
}
