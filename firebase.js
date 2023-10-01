// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-clone-fec62.firebaseapp.com",
  projectId: "twitter-clone-fec62",
  storageBucket: "twitter-clone-fec62.appspot.com",
  messagingSenderId: "810787190467",
  appId: "1:810787190467:web:ec0dcc253adc73f8ddd476",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
