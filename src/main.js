import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'


const vueApp = createApp(App)
vueApp.use(PrimeVue, { theme: { preset: Aura } })
vueApp.use(router)

vueApp.mount('#app')

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT8SFQ0u6fFirHL7IzzDXEpLmiNvv5MA4",
  authDomain: "week7-wenhan-li.firebaseapp.com",
  projectId: "week7-wenhan-li",
  storageBucket: "week7-wenhan-li.firebasestorage.app",
  messagingSenderId: "800257097955",
  appId: "1:800257097955:web:3fc0a285c5cf33baa045d6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
