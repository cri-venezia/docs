import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Importiamo il nostro router

// Importiamo gli stili principali
import './style.css' 

// Importiamo gli stili di GLightbox
import 'glightbox/dist/css/glightbox.min.css';

const app = createApp(App)

app.use(router) // Diciamo a Vue di usare il router

app.mount('#app')
