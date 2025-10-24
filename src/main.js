import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './router'
import './style.css'
import App from './App.vue'

/* Importazione Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// Importa le icone specifiche che useremo
import { faFacebook, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faGlobe, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

// Aggiungi le icone alla libreria
library.add(faFacebook, faInstagram, faGithub, faGlobe, faBars, faXmark)
/* Fine configurazione Font Awesome */

// Configurazione Router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes,
})

const app = createApp(App)
app.use(router)

// Registra il componente FontAwesomeIcon globalmente
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')