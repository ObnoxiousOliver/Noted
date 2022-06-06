// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCkMrU4mGDCvopq4IR2S15xbN-zZV5YWP4',
  authDomain: 'noted-todo-list.firebaseapp.com',
  projectId: 'noted-todo-list',
  storageBucket: 'noted-todo-list.appspot.com',
  messagingSenderId: '850378340812',
  appId: '1:850378340812:web:e648554db2f3638ba00569'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)
