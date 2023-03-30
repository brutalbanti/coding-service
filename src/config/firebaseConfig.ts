import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC_miIwxJPlO09P-QH-bumWMYGbasbPvcQ",
  authDomain: "programming-a58d7.firebaseapp.com",
  projectId: "programming-a58d7",
  storageBucket: "programming-a58d7.appspot.com",
  messagingSenderId: "347730443449",
  appId: "1:347730443449:web:7a8bf802a529e69aec2f68"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export const auth = getAuth();
export default app;