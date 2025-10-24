import DocPage from './components/DocPage.vue';
import Home from './views/Home.vue'; // <-- Importa il nuovo componente Home

const routes = [
  {
    path: '/', // <-- Nuova rotta per la Home
    name: 'Home',
    component: Home,
  },
  {
    path: '/docs/:category/:file',
    name: 'DocPage',
    component: DocPage,
  },
];

export default routes;