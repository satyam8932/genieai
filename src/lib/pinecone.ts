import { Pinecone, PineconeRecord } from '@pinecone-database/pinecone';
import { deleteFromFirebase, downloadFromFirebase } from './firebase-server';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document, RecursiveCharacterTextSplitter } from "@pinecone-database/doc-splitter";
import { getEmbeddings } from './embeddings';
import md5 from 'md5';
import { convertToASCII } from './utils';

// Initialize and configure Pinecone Client
export const getPineconeClient = async () => {
    const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY as string,  // Pinecone API key from environment variables
    });
    return pinecone;  // Return the Pinecone client instance
};

// Type for parsed PDF pages
type PDFPage = {
    pageContent: string;
    metadata: {
        loc: { pageNumber: number }  // Metadata to track the page number
    };
};

/**
 * Load a PDF from Firebase, process it, and upload embeddings to Pinecone.
 * @param fileKey - The key identifying the PDF file in Firebase Storage.
 * @returns The first document from the processed pages or `null` if an error occurred.
 */
export async function loadFirebaseIntoPinecone(fileKey: string) {
    try {
        // Download the PDF file from Firebase Storage
        const fileName = await downloadFromFirebase(fileKey);

        if (!fileName) {
            throw new Error('Failed to download file from Firebase');  // Error handling for failed download
        }

        // Load the PDF file
        const loader = new PDFLoader(fileName);
        const pages = (await loader.load()) as PDFPage[];

        // Prepare documents from PDF pages
        const documents = await Promise.all(pages.map(prepareDocument));

        // Vectorize the documents and generate embeddings
        const vectors = await Promise.all(documents.flat().map(embedDocument));

        // Get Pinecone client and prepare for upserting
        const client = await getPineconeClient();
        const pineconeIndex = client.Index(process.env.PINECONE_INDEX as string);
        const namespace = convertToASCII(fileKey);

        // Upsert vectors in batches of 100
        const batchSize = 100;
        for (let i = 0; i < vectors.length; i += batchSize) {
            const batch = vectors.slice(i, i + batchSize);
            await pineconeIndex.namespace(namespace).upsert(batch);
            console.log(`Upserted batch ${i / batchSize + 1} of ${Math.ceil(vectors.length / batchSize)}`);
        }

        return documents[0];  // Return the first document from the processed pages

    } catch (error) {
        console.error("Error processing PDF:", error);  // Log errors for debugging
        return null;  // Return null if an error occurs
    }
};

/**
 * Generate Pinecone records from document embeddings.
 * @param doc - A document containing text and metadata.
 * @returns A PineconeRecord containing the document's embedding and metadata.
 */
async function embedDocument(doc: Document): Promise<PineconeRecord> {
    try {
        const embeddings = await getEmbeddings(doc.pageContent);  // Get embeddings for the document's text
        const hash = md5(doc.pageContent);  // Create a hash of the page content for a unique ID

        return {
            id: hash,  // Unique ID for the document
            values: embeddings,  // Embeddings vector for the document
            metadata: {
                text: doc.metadata.text as string,  // Text content of the document
                pageNumber: doc.metadata.pageNumber as number,  // Page number of the document
            }
        };

    } catch (error) {
        console.error("Error embedding document:", error);  // Log errors for debugging
        throw error;  // Rethrow error for handling in the caller
    }
};

/**
 * Truncate a string to a specified number of bytes.
 * @param str - The string to be truncated.
 * @param bytes - The maximum number of bytes for the truncated string.
 * @returns The truncated string.
 */
export const truncateStringByBytes = (str: string, bytes: number) => {
    const enc = new TextEncoder();
    return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes));  // Truncate string to the specified byte length
};

/**
 * Prepare a PDF page for processing by cleaning and splitting the content.
 * @param page - The PDF page to be prepared.
 * @returns An array of Document objects split by character length.
 */
async function prepareDocument(page: PDFPage) {
    let { pageContent, metadata } = page;
    pageContent = pageContent.replace(/\n/g, '');  // Remove newlines from page content

    // Initialize a text splitter to break the content into smaller chunks
    const splitter = new RecursiveCharacterTextSplitter();
    const docs = await splitter.splitDocuments([
        new Document({
            pageContent,
            metadata: {
                pageNumber: metadata.loc.pageNumber,  // Page number for metadata
                text: truncateStringByBytes(pageContent, 36000)  // Truncate content to avoid exceeding Pinecone limits
            }
        })
    ]);

    return docs;  // Return the prepared documents
};

/**
 * Deletes namespaces including all the vectors in pinecone and files from firebase using fileKey.
 * @param namespace - The namespace to be deleted and it will acts as a fileKey.
 * @returns Boolean value if success then true else false.
 */
export async function deletePineconeVectorAndFirebase(namespace: string) {
    try {
        const client = await getPineconeClient();
        const pineconeIndex = client.Index(process.env.PINECONE_INDEX as string);
        await pineconeIndex.namespace(namespace).deleteAll();
        const fileKey = namespace;  // Namespace is same as filekey
        await deleteFromFirebase(fileKey);
        return true; // Success
    } catch (err) {
        console.log(err);
    }
}