import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where,  } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Ensure these are correct from Firebase Console -> Project settings
const firebaseConfig = {
    apiKey: "AIzaSyA-NWUvF421Fgz_-h-_Sw2GoKiRGIyW4iI",
    authDomain: "myapp-9c418.firebaseapp.com",
    projectId: "myapp-9c418",
    storageBucket: "myapp-9c418.appspot.com",
    messagingSenderId: "339788127684",
    appId: "1:339788127684:web:ce4f308c58696d0c691891",
    measurementId: "G-6VKXV24Y66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);  // Ensure auth is initialized with `app`
const storage = getStorage(app);

export { db, auth, collection, addDoc, getDocs, query, where, getStorage, storage, };
