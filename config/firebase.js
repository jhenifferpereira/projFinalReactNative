// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from 'firebase';
import firestore from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0YfdJNzq6wCuAG2cS4dVcLvDZJm-OND4",
  authDomain: "dbprojfinalreactnative.firebaseapp.com",
  projectId: "dbprojfinalreactnative",
  storageBucket: "dbprojfinalreactnative.appspot.com",
  messagingSenderId: "489722417843",
  appId: "1:489722417843:web:5103e8cb5e3531e46516c6"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
// Initialize Firebase
//const app = initializeApp(firebaseConfig);