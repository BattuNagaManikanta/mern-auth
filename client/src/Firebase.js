// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-a1fa7.firebaseapp.com",
  projectId: "mern-auth-a1fa7",
  storageBucket: "mern-auth-a1fa7.appspot.com",
  messagingSenderId: "1055449402467",
  appId: "1:1055449402467:web:3afccd365864fc39967c56"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);