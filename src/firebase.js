import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCi6JF2pvleTnKTJoqgG-VnnQ1xzCSyfRo",
  authDomain: "currencyproject-ddc9f.firebaseapp.com",
  projectId: "currencyproject-ddc9f",
  storageBucket: "currencyproject-ddc9f.appspot.com",
  messagingSenderId: "635411896264",
  appId: "1:635411896264:web:6939323eb6f94e860952fd",
  databaseURL: "https://currencyproject-ddc9f-default-rtdb.firebaseio.com/",
};

// console.log(process.env.REACT_APP_FIREBASE_DATABASE_URL);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export default app;