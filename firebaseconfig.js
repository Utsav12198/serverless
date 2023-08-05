// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, TwitterAuthProvider, GoogleAuthProvider } from "firebase/auth";

const firebaseconfig = {
    apiKey: "AIzaSyBZbVM2BoY1mmpk5EKsxqTkw2sXj92ZJEQ",
    authDomain: "sdpproject-b53f8.firebaseapp.com",
    databaseURL: "https://sdpproject-b53f8-default-rtdb.firebaseio.com",
    projectId: "sdpproject-b53f8",
    storageBucket: "sdpproject-b53f8.appspot.com",
    messagingSenderId: "413574580892",
    appId: "1:413574580892:web:36b85654d52cdac4f3fb59",
    measurementId: "G-8P7S88R1L3"
};

// Initialize Firebase
const app = initializeApp(firebaseconfig);

const auth = getAuth(app);

const twitterprovider = new TwitterAuthProvider();
const googleprovider = new GoogleAuthProvider();

export {auth, twitterprovider, googleprovider}