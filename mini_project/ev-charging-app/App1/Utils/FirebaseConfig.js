// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrzGtvafhOpZbh30TbI7lOXJMedLQ9GM8",
  authDomain: "ev-charging-updated.firebaseapp.com",
  projectId: "ev-charging-updated",
  storageBucket: "ev-charging-updated.appspot.com",
  messagingSenderId: "543299514846",
  appId: "1:543299514846:web:926de2907325206629ed4f",
  measurementId: "G-1V3P0NPXDW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
