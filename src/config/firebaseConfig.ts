import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAC0Wm2Im6yqfT0NHw-ga5kP1A804kjqPU',
    authDomain: 'edubridge-ff2bb.firebaseapp.com',
    projectId: 'edubridge-ff2bb',
    storageBucket: 'edubridge-ff2bb.firebasestorage.app',
    messagingSenderId: '430177732295',
    appId: '1:430177732295:web:c944be2032bdcc37c7a0e2',
    measurementId: 'G-81BJPCQX8B',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
