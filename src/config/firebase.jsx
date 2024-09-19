// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0-GwmvZILSxU-RajTjVtsJVAcb7rv888",
  authDomain: "shoplify-59ca9.firebaseapp.com",
  projectId: "shoplify-59ca9",
  storageBucket: "shoplify-59ca9.appspot.com",
  messagingSenderId: "416618773746",
  appId: "1:416618773746:web:0d8e9780a1847290cae46b",
  measurementId: "G-1EVNLBGSH3"
};

// Initialize Firebase
const firebaseAppConfig = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebaseAppConfig