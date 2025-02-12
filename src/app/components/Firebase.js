// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyDk0T5ZVZZiQDA6spVxLjdbT7G4xf7tL5Y",
  authDomain: "bsuchatbot-fe4d2.firebaseapp.com",
  projectId: "bsuchatbot-fe4d2",
  storageBucket: "bsuchatbot-fe4d2.appspot.com",
  messagingSenderId: "475119270704",
  appId: "1:475119270704:web:0c636ae3fdded0318366f5",
  measurementId: "G-463TBHYHWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Google Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export the auth and provider for use in other components
export { auth, provider };
