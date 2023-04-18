// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";


const firebaseConfig = {
    apiKey: "AIzaSyCgm2-ETo8Q8tv7N3NM9vRC9yW7kCmLIrQ",
    authDomain: "opcion-atlantico.firebaseapp.com",
    projectId: "opcion-atlantico",
    storageBucket: "opcion-atlantico.appspot.com",
    messagingSenderId: "478294155718",
    appId: "1:478294155718:web:c6132a9776bf333ec392c7"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseDB = getFirestore(FirebaseApp);
