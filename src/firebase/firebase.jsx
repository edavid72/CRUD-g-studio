import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAgFaUeY3B8Cm-RpH6nDZW8kc4V6vEMJxw',
  authDomain: 'g-studio-crud.firebaseapp.com',
  projectId: 'g-studio-crud',
  storageBucket: 'g-studio-crud.appspot.com',
  messagingSenderId: '1025337243955',
  appId: '1:1025337243955:web:1c1c55e73601a4ff8f2646',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
