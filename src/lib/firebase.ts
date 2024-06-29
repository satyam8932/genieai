import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfxUnbHKr-YXKiMLKoqBgYtw2rKIgGK3w",
  authDomain: "genieai-b6a9b.firebaseapp.com",
  projectId: "genieai-b6a9b",
  storageBucket: "genieai-b6a9b.appspot.com",
  messagingSenderId: "512515746544",
  appId: "1:512515746544:web:eebcc24b66ec9b2502f035",
  measurementId: "G-KMDMZH23X2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);