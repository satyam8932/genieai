import { OpenAIApi, Configuration } from 'openai-edge';

// Initialize OpenAI API client with the API key from environment variables
const configOpenAI = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configOpenAI);

/**
 * Generates embeddings for the provided text using OpenAI's API.
 * @param text - The input text for which embeddings are to be generated.
 * @returns A promise that resolves to an array of numbers representing the text embeddings.
 */
export async function getEmbeddings(text: string): Promise<number[]> {
    try {
        // Make a request to OpenAI's embedding endpoint with the specified model
        const response = await openai.createEmbedding({
            model: 'text-embedding-ada-002',
            input: text.replace(/\n/g, ' '),  // Replace newlines with spaces to ensure a single-line input
        });

        // Extract the embedding data from the response
        const results = await response.json();
        return results.data[0].embedding as number[];  // Return the embedding as an array of numbers

    } catch (error) {
        // Log the error for debugging purposes and rethrow it
        console.error("Error creating embeddings", error);
        throw error;
    }
}
