import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

  apiKey: "AIzaSyA8zjXOEk0O3OOWvgJ2_AH_0i32vQIHpcQ",

  authDomain: "plasma-blogs.firebaseapp.com",

  projectId: "plasma-blogs",

  storageBucket: "plasma-blogs.appspot.com",

  messagingSenderId: "847393992455",

  appId: "1:847393992455:web:6d465f7e76042e0503dfa2"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)