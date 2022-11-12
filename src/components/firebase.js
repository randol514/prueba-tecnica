// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4_u4eOToaVCousXmm-F4Qfnvl83uQQtQ",
  authDomain: "intercorp-prueba.firebaseapp.com",
  projectId: "intercorp-prueba",
  storageBucket: "intercorp-prueba.appspot.com",
  messagingSenderId: "369106113837",
  appId: "1:369106113837:web:2704b2b463d2499338afa4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)