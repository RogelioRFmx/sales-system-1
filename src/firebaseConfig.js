// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAjenVT42wxoH-7Z1KO3sgka1XZOgdMBA",
  authDomain: "sales-app-1.firebaseapp.com",
  projectId: "sales-app-1",
  storageBucket: "sales-app-1.firebasestorage.app",
  messagingSenderId: "676409862298",
  appId: "1:676409862298:web:c4bbec0f5fff6700cbd723"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};