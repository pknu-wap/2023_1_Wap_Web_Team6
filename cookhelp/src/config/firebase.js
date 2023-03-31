import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyCq8NgRmJ11v00IsTDDs2AfUZIIyRylKDs",
  authDomain: "cookhelp-24002.firebaseapp.com",
  projectId: "cookhelp-24002",
  storageBucket: "cookhelp-24002.appspot.com",
  messagingSenderId: "945713304553",
  appId: "1:945713304553:web:26d86244d825a3c18fb178",
  measurementId: "G-MG88S1VWX3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);