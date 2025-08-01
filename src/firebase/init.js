// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT8SFQ0u6fFirHL7IzzDXEpLmiNvv5MA4",
  authDomain: "week7-wenhan-li.firebaseapp.com",
  projectId: "week7-wenhan-li",
  storageBucket: "week7-wenhan-li.firebasestorage.app",
  messagingSenderId: "800257097955",
  appId: "1:800257097955:web:3fc0a285c5cf33baa045d6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
export default db;