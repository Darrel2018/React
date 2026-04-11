// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHZcsePHDwBtdal2V2EUFUFoKOlYv0E68",
  authDomain: "todo-list-69305.firebaseapp.com",
  databaseURL: "https://todo-list-69305-default-rtdb.firebaseio.com",
  projectId: "todo-list-69305",
  storageBucket: "todo-list-69305.firebasestorage.app",
  messagingSenderId: "451313787853",
  appId: "1:451313787853:web:f7e7b6592bcd463ea91a84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();