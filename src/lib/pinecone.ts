import { Pinecone, PineconeRecord } from '@pinecone-database/pinecone';
import { downloadFromFirebase } from './firebase-server';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document, RecursiveCharacterTextSplitter } from "@pinecone-database/doc-splitter";
import { getEmbeddings } from './embeddings';
import md5 from 'md5';
import { convertToASCII } from './utils';

// Setup Pinecone Client
export const getPineconeClient = async () => {
    const pineconeAPIKey = process.env.PINECONE_API_KEY;

    if (!pineconeAPIKey) {
        throw new Error('PINECONE_API_KEY is not set in the environment variables');
    }

    const pinecone = new Pinecone({
        apiKey: pineconeAPIKey,
    });
    return pinecone;
};

// PDF Parsing Type Define
type PDFPage = {
    pageContent: string;
    metadata: {
        loc: { pageNumber: number }
    };
};

export async function loadFirebaseIntoPinecone(fileKey: string) {
    try {
        // Downloading PDF files from Firebase
        const fileName = await downloadFromFirebase(fileKey);

        if (!fileName) {
            throw new Error('Failed to download file from Firebase');
        }

        // Load the PDF
        const loader = new PDFLoader(fileName);
        const pages = (await loader.load()) as PDFPage[];

        // Split and Segment PDF
        const documents = await Promise.all(pages.map(prepareDocument));

        // Vectorize and embed individual documents
        const vectors = await Promise.all(documents.flat().map(embedDocument));

        // Upload to Pinecone
        const client = await getPineconeClient();
        const pineconeIndex = client.Index(process.env.PINECONE_INDEX as string);

        const namespace = convertToASCII(fileKey);
        await pineconeIndex.namespace(namespace).upsert(vectors);

        return documents[0];

    } catch (error) {
        console.error("Error processing PDF:", error);
        return null;
    }
};

async function embedDocument(doc: Document): Promise<PineconeRecord> {
    try {
        const embeddings = await getEmbeddings(doc.pageContent);
        const hash = md5(doc.pageContent);

        return {
            id: hash,
            values: embeddings,
            metadata: {
                text: doc.metadata.text as string,
                pageNumber: doc.metadata.pageNumber as number,
            }
        };

    } catch (error) {
        console.error("Error embedding document:", error);
        throw error;
    }
};

/* 
This function helps to first convert the string in uint8Array so that it' we can determine
the byte length of the string then decode it back to string. This will help to prevent sending
massive data at once to pinecone 
*/
export const truncateStringByBytes = (str: string, bytes: number) => {
    const enc = new TextEncoder();
    return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDFPage) {
    let { pageContent, metadata } = page;
    pageContent = pageContent.replace(/\n/g, '');

    // Split the docs
    const splitter = new RecursiveCharacterTextSplitter();
    const docs = await splitter.splitDocuments([
        new Document({
            pageContent,
            metadata: {
                pageNumber: metadata.loc.pageNumber,
                text: truncateStringByBytes(pageContent, 36000)
            }
        })
    ]);

    return docs;
};