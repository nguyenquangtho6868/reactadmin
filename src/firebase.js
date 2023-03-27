// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ48JGv07VgnXM2yNEOMILpoJAQ2k1CkM",
  authDomain: "adminasm3.firebaseapp.com",
  projectId: "adminasm3",
  storageBucket: "adminasm3.appspot.com",
  messagingSenderId: "718873948000",
  appId: "1:718873948000:web:433b7ee3524de61d673805",
  measurementId: "G-LP7P86XJX1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
