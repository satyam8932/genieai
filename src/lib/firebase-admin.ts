import admin from 'firebase-admin';

// Initialize Firebase Admin SDK if not already initialized
// This code is writtne due to downloading files from storage bucket otherwise if we don't use admin code then it will select default none bucket
if (!admin.apps.length) {
  try {
    // Parse the service account JSON string from environment variables
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

    // Initialize Firebase Admin with service account credentials and storage bucket URL
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,  // Specify the Firebase Storage bucket
    });

    console.log("Firebase Admin initialized successfully");  // Log successful initialization
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error);  // Log errors for debugging
  }
}

// Export Firebase Storage instance for use in other modules
export const storage = admin.storage();
