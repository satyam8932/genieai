import { Pinecone } from '@pinecone-database/pinecone';
import { convertToASCII } from './utils';
import { getEmbeddings } from './embeddings';

// Fetches matching vectors from Pinecone index based on query embeddings
export async function getMatchesFromEmbeddings(embeddings: number[], fileKey: string) {
    // Initialize Pinecone client with API key from environment variables
    const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY as string,
    });

    // Access the Pinecone index from environment variables
    const index = pinecone.Index(process.env.PINECONE_INDEX as string);

    try {
        // Convert fileKey to ASCII for namespace usage
        const namespace = convertToASCII(fileKey);

        // Query the Pinecone index to find similar embeddings
        const queryResults = await index.namespace(namespace).query({
            vector: embeddings,
            topK: 5,  // Retrieve top 5 results
            includeMetadata: true,  // Include metadata in the results
        });

        // Return matches or an empty array if no matches found
        return queryResults.matches || [];
        
    } catch (err) {
        // Log and rethrow error for upstream handling
        console.error("Error Querying Embeddings", err);
        throw err;
    }
}

/**
 * Finds and matches query embeddings with document embeddings
 * @param query - The query string to be embedded
 * @param fileKey - Identifier for the vectors in Pinecone
 * @returns A string containing the top matching documents
 */
export async function getContext(query: string, fileKey: string) {
    // Get embeddings for the query string
    const queryEmbeddings = await getEmbeddings(query);

    // Get matching vectors from Pinecone
    const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

    // Filter results to only include matches with a score greater than 0.7
    const qualifyResult = matches.filter(
        (match) => match.score && match.score > 0.7
    );

    type Metadata = {
        text: string,
        pageNumber: number
    }

    // Map filtered results to text and join into a single string
    let docs = qualifyResult.map(match => (match.metadata as Metadata).text);

    // Return concatenated text, truncated to 3000 characters if necessary
    return docs.join('\n').substring(0, 3000);  // Ensures text does not exceed OpenAI's 3000-character limit
}
