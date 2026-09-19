import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtdpiEIQUSQjFyLIUEAakUOlO59yhf6xI",
  authDomain: "jb-s-bookmark.firebaseapp.com",
  projectId: "jb-s-bookmark",
  storageBucket: "jb-s-bookmark.firebasestorage.app",
  messagingSenderId: "591291647139",
  appId: "1:591291647139:web:2ffa80acb08cd153e9ab16"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);