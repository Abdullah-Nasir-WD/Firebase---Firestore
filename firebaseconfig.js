import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {  getFirestore , collection , addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQMpZN_7NuDv7KQUa0xsizMDwl7h6UyRA",
  authDomain: "fire-begin-87b94.firebaseapp.com",
  projectId: "fire-begin-87b94",
  storageBucket: "fire-begin-87b94.firebasestorage.app",
  messagingSenderId: "782309568445",
  appId: "1:782309568445:web:efb2b195cff1b5a0de2cd4",
  measurementId: "G-5S84LRL1GQ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);