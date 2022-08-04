// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0ozFb2HQGkLS5O4_UOo5glqCKPFZrcQM",
  authDomain: "wayable.firebaseapp.com",
  databaseURL: "https://wayable-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wayable",
  storageBucket: "wayable.appspot.com",
  messagingSenderId: "792649488358",
  appId: "1:792649488358:web:feeb35a1b753c5aa18a827",
  measurementId: "G-LRFNG87GJ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// DB ref
export const db = getDatabase(app)

