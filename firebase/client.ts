// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARRTcTkb6RoLO9aAxUpVJRj3ninM-phJ4",
  authDomain: "valo-dev-6fde4.firebaseapp.com",
  projectId: "valo-dev-6fde4",
  storageBucket: "valo-dev-6fde4.appspot.com",
  messagingSenderId: "351080021067",
  appId: "1:351080021067:web:6fc23ba788d0e315abe1ce",
  measurementId: "G-ZMD53SXEF1",
};

// Initialize Firebase
if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

export const storage = getStorage();
export const auth = getAuth();
export const functions = getFunctions();
export const db = getFirestore();
