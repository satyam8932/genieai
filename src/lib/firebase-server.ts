import { storage } from './firebase-admin';
import fs from 'fs';
import path from 'path';
import os from 'os';

/**
 * Download a file from Firebase Storage and save it to a temporary directory.
 * @param fileKey - The path or key of the file in Firebase Storage.
 * @returns The local path to the downloaded file, or `null` if an error occurred.
 */
export async function downloadFromFirebase(fileKey: string): Promise<string | null> {
  try {
    const bucket = storage.bucket();  // Get the default Firebase Storage bucket
    const cleanFileKey = fileKey.replace(/^\/+/, '');  // Remove leading slashes from the file key
    const file = bucket.file(cleanFileKey);  // Get a reference to the file in the bucket

    const tmpDir = os.tmpdir();  // Get the system's temporary directory path
    const fileName = path.join(tmpDir, `file-${Date.now()}${path.extname(cleanFileKey)}`);  // Generate a unique file path

    await file.download({ destination: fileName });  // Download the file to the temporary directory

    return fileName;  // Return the local path to the downloaded file

  } catch (error) {
    console.error("Error downloading file from Firebase:", error);  // Log any errors encountered
    return null;  // Return null if an error occurred
  }
}
