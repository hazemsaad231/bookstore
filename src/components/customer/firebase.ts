// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc,getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKiHl4ZkRubsFDEfFNACGCEKLtmMKJNRE",
  authDomain: "store-10c89.firebaseapp.com",
  databaseURL: "https://store-10c89-default-rtdb.firebaseio.com",
  projectId: "store-10c89",
  storageBucket: "store-10c89.firebasestorage.app",
  messagingSenderId: "635043811016",
  appId: "1:635043811016:web:1c55c7e5344344014bdffd",
  measurementId: "G-1KZSW6KCP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {app,analytics,db,collection,addDoc,getDocs};