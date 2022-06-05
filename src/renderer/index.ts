import { createApp } from 'vue'
import { initializeApp } from 'firebase/app'

import App from './App.vue'

import mq from './utils/mq'

// Create
createApp(App)
  .use(mq)
  .mount('#app')

// Initialize Firebase
initializeApp({
  apiKey: 'AIzaSyCkMrU4mGDCvopq4IR2S15xbN-zZV5YWP4',
  authDomain: 'noted-todo-list.firebaseapp.com',
  projectId: 'noted-todo-list',
  storageBucket: 'noted-todo-list.appspot.com',
  messagingSenderId: '850378340812',
  appId: '1:850378340812:web:e648554db2f3638ba00569'
})
