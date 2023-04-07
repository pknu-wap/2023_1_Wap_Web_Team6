// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq8NgRmJ11v00IsTDDs2AfUZIIyRylKDs",
  authDomain: "cookhelp-24002.firebaseapp.com",
  projectId: "cookhelp-24002",
  storageBucket: "cookhelp-24002.appspot.com",
  messagingSenderId: "945713304553",
  appId: "1:945713304553:web:26d86244d825a3c18fb178",
  measurementId: "G-MG88S1VWX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fireStore = getFirestore(app);

export { fireStore };
