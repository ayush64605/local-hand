import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where,  } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Ensure these are correct from Firebase Console -> Project settings
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);  // Ensure auth is initialized with `app`
const storage = getStorage(app);

export { db, auth, collection, addDoc, getDocs, query, where, getStorage, storage, };
