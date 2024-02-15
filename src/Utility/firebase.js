// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";

import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBKyldQxFBXN83_jmu3_QsK6d694hh7IY",
  authDomain: "e-clone-3d99c.firebaseapp.com",
  projectId: "e-clone-3d99c",
  storageBucket: "e-clone-3d99c.appspot.com",
  messagingSenderId: "750563694992",
  appId: "1:750563694992:web:0454b260a9eb288449fb15",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
