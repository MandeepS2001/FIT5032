import './assets/main.css'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import router from './router'

import { createApp } from 'vue'
import App from './App.vue'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA2odFFqGqTe3oqkpGydmDlIGRIZIegVaI',
  authDomain: 'fit5032-week6-5d1b1.firebaseapp.com',
  projectId: 'fit5032-week6-5d1b1',
  storageBucket: 'fit5032-week6-5d1b1.firebasestorage.app',
  messagingSenderId: '217934602929',
  appId: '1:217934602929:web:2a62b0c38a7b7f31127890',
}

// Initialize Firebase
initializeApp(firebaseConfig)
const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(router)

app.mount('#app')
