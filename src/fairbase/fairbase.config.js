
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK9XmjZQcq8WOgpiujI8alWuos35MhOVY",
  authDomain: "login-and-register-fairbase-tg.firebaseapp.com",
  projectId: "login-and-register-fairbase-tg",
  storageBucket: "login-and-register-fairbase-tg.appspot.com",
  messagingSenderId: "383931775679",
  appId: "1:383931775679:web:fac3a4a4e8f5fca503640a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;

