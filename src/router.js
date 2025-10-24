import DocPage from './components/DocPage.vue';
import Home from './views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    // MODIFICA: Aggiunto (.+) per matchare percorsi nidificati
    path: '/docs/:category/:file(.+)', 
    name: 'DocPage',
    component: DocPage,
  },
];

export default routes;