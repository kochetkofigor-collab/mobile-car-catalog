import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDmQn__wJBe34WWazTXPZQFRipy7k6Yuvw",
  authDomain: "keyrider-prod.firebaseapp.com",
  projectId: "keyrider-prod",
  storageBucket: "keyrider-prod.firebasestorage.app",
  messagingSenderId: "52192141594",
  appId: "1:52192141594:web:c2e4f7ed3374a65a770ca3",
  measurementId: "G-1YJL689WYB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

if (typeof window !== 'undefined') {
  getAnalytics(app);
}