import { Pinecone } from '@pinecone-database/pinecone';
import { downloadFromFirebase } from './firebase-server';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

// Setup API KEY
const pineconeAPIKey = process.env.PINECONE_API_KEY;

if (!pineconeAPIKey) {
  throw new Error('PINECONE_API_KEY is not set in the environment variables');
}

export const pinecone = new Pinecone({
  apiKey: pineconeAPIKey,
});

export async function loadFirebaseIntoPinecone(fileKey: string) {
  try {
    // downloading firebase files into file
    const fileName = await downloadFromFirebase(fileKey);
    
    if (!fileName) {
      throw new Error('Failed to download file from Firebase');
    }

    // Load the PDF
    const loader = new PDFLoader(fileName);
    const docs = await loader.load();

    console.log(`Loaded ${docs.length} page(s) from the PDF.`);

    // Here you would typically process the docs and load them into Pinecone
    // This part depends on how you want to structure your data in Pinecone

    return docs;
  } catch (error) {
    console.error("Error processing PDF:", error);
    return null;
  }
}