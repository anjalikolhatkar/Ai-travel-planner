// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrInh_DMohhCTYBHxM5IwlzwvsaSCNUfY",
  authDomain: "ai-travel-planner-88034.firebaseapp.com",
  projectId: "ai-travel-planner-88034",
  storageBucket: "ai-travel-planner-88034.appspot.com",
  messagingSenderId: "683085198283",
  appId: "1:683085198283:web:b64017206d621a37fe7c4e",
  measurementId: "G-8TPBWKHWHN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);