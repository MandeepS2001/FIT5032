// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD4ciA2l3ViZSRN5QB8OWv6pdToRRg0aP0',
  authDomain: 'light-lambda-468509-m8.firebaseapp.com',
  projectId: 'light-lambda-468509-m8',
  storageBucket: 'light-lambda-468509-m8.firebasestorage.app',
  messagingSenderId: '222306503389',
  appId: '1:222306503389:web:7140f582c1b2bb8c26a934',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize services
const db = getFirestore(app)
const auth = getAuth(app)

export default db
export { auth }
