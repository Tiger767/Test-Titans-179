// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJtTIcNoBSJKougy9NpMSVYx_PZpY6YdE",
  authDomain: "testtitans-25392.firebaseapp.com",
  projectId: "testtitans-25392",
  storageBucket: "testtitans-25392.appspot.com",
  messagingSenderId: "202285252524",
  appId: "1:202285252524:web:107a0d8f4362e378088409"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);