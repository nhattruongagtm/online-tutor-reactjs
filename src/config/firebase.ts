// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBS9-88nXqyZTxQIQ5GJX24jW9fNMbw74U',
  authDomain: 'online-tutor-77046.firebaseapp.com',
  projectId: 'online-tutor-77046',
  storageBucket: 'online-tutor-77046.appspot.com',
  messagingSenderId: '73965078301',
  appId: '1:73965078301:web:c16261871cb110b09483f4',
  measurementId: 'G-FN3NC1HHG1',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const storage = getStorage(firebase);
export default firebase;
  