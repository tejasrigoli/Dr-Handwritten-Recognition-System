import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA_Kny3jxqOH0IKon8RgKuV8oBE4ra7SEM",
    authDomain: "prescriptionrecognition.firebaseapp.com",
    projectId: "prescriptionrecognition",
    storageBucket: "prescriptionrecognition.appspot.com",
    messagingSenderId: "219344864428",
    appId: "1:219344864428:web:b2f18d2e719b04ef430b09",
    measurementId: "G-ZK68BMHENB"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export {firebase};