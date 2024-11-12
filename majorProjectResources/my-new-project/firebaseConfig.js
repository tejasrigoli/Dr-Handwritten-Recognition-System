import { initializeApp } from 'firebase/app';
import {getStorage} from 'firebase/storage';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyCostTjY8pFItbViUEUyn5zVtc1O5qbRCM',
    authDomain: 'prescriptionrecognition.firebaseapp.com',
    databaseURL: 'https://project-id.firebaseio.com',
    projectId: 'prescriptionrecognition',
    storageBucket: 'prescriptionrecognition.appspot.com',
    messagingSenderId: 'sender-id',
    appId: 'prescriptionrecognition',
    measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
export const storage = getStorage();