import { createRouter, createWebHistory } from 'vue-router'
import DocPage from './components/DocPage.vue'

// RIMOSSA la funzione helper getBase()

const routes = [
  {
    path: '/',
    // Reindirizziamo la root alla pagina di introduzione
    redirect: '/generale/introduction' 
  },
  {
    // Questa è la rotta dinamica che gestisce tutte le pagine
    // Es. /generale/introduction o /cri-trasporti/install
    path: '/:category/:page', 
    name: 'DocPage',
    component: DocPage,
    props: true // Passa i parametri (:category, :page) come props al componente
  },
  {
    // Rotta per le pagine senza categoria (come introduction)
    path: '/:page',
    name: 'DocPageSimple',
    component: DocPage,
    props: route => ({ category: '', page: route.params.page })
  }
]

const router = createRouter({
  // history: createWebHistory(getBase()), // VECCHIO
  // Vite imposta automaticamente la base corretta da `vite.config.js`
  // usando 'import.meta.env.BASE_URL'
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Evidenzia il link attivo nella sidebar
  linkActiveClass: 'bg-blue-600 text-white shadow-md',
  linkExactActiveClass: 'bg-blue-600 text-white shadow-md',
})

export default router