
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-website-builder-8821c.firebaseapp.com",
  projectId: "ai-website-builder-8821c",
  storageBucket: "ai-website-builder-8821c.firebasestorage.app",
  messagingSenderId: "276888380251",
  appId: "1:276888380251:web:6bc8fe9fc36e246b29307e",
  measurementId: "G-ZS8KL2PGCL"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();