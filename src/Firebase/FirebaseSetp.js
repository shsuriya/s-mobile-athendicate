
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCe4rmZMZ3VGV16XOCTo8yHceZBQhxRxXA",
  authDomain: "mobile-athentic.firebaseapp.com",
  projectId: "mobile-athentic",
  storageBucket: "mobile-athentic.firebasestorage.app",
  messagingSenderId: "182305826227",
  appId: "1:182305826227:web:3b435da135b1be51f517c6"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { auth };