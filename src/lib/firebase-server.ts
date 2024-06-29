import { storage } from './firebase-admin';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function downloadFromFirebase(fileKey: string): Promise<string | null> {
  try {
    const bucket = storage.bucket();
    const cleanFileKey = fileKey.replace(/^\/+/, '');
    const file = bucket.file(cleanFileKey);

    const tmpDir = os.tmpdir();
    const fileName = path.join(tmpDir, `file-${Date.now()}${path.extname(cleanFileKey)}`);

    await file.download({ destination: fileName });

    return fileName;

  } catch (error) {
    console.error("Error downloading file from Firebase:", error);
    return null;
  }
}
