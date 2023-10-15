// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSjtpuyn26A1WNSyQCwMQPImw4lkyfnSQ",
  authDomain: "app-matriculas-f2d24.firebaseapp.com",
  projectId: "app-matriculas-f2d24",
  storageBucket: "app-matriculas-f2d24.appspot.com",
  messagingSenderId: "766119315549",
  appId: "1:766119315549:web:4719d84fd64a78fccbe5b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;