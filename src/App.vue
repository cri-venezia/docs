<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- Passa lo stato 'sidebarOpen' e ascolta l'evento 'toggle-sidebar' -->
    <SiteHeader :sidebar-open="sidebarOpen" @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <div class="flex-1 flex overflow-hidden">
      <!-- 
        Sidebar (Menu di Navigazione)
        - 'transform' e 'transition' per l'animazione slide-in/out
        - z-index 30 per stare sopra il contenuto
        - Chiusa di default su mobile (translate-x-full)
        - Aperta su desktop (md:translate-x-0)
      -->
      <aside 
        :class="[
          'fixed inset-y-0 right-0 z-30 w-64 bg-gray-50 border-l border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        ]"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto">
          <nav class="space-y-2">
            <!-- Loop sulle categorie (es. Generale, Cri-trasporti) -->
            <div v-for="category in pages" :key="category.path">
              <!-- Pulsante Categoria (Accordion) -->
              <button 
                @click="toggleAccordion(category.path)"
                class="flex items-center justify-between w-full p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <span class="flex-1 text-left whitespace-nowrap">{{ category.category }}</span>
                <!-- Icona freccia che ruota -->
                <svg 
                  class="w-4 h-4 transition-transform duration-200" 
                  :class="{'rotate-90': accordionState[category.path]}"
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
              </button>
              
              <!-- Elenco Pagine (Accordion content) -->
              <ul v-show="accordionState[category.path]" class="pl-4 space-y-1 pt-1">
                <li v-for="page in category.pages" :key="page.link">
                  <!-- 
                    Usiamo router-link per la navigazione.
                    Il router (in router.js) si aspetta percorsi senza .md
                    Es. /cri-trasporti/install
                  -->
                  <router-link
                    :to="'/' + page.link.replace('.md', '')"
                    class="block p-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                    active-class="bg-red-100 text-red-700 font-medium"
                  >
                    {{ page.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      <!-- Overlay per chiudere la sidebar su mobile -->
      <div 
        v-if="sidebarOpen" 
        @click="sidebarOpen = false"
        class="fixed inset-0 z-20 bg-black/30 md:hidden"
        aria-hidden="true"
      ></div>

      <!-- Area Contenuto Principale -->
      <main class="flex-1 overflow-y-auto p-4 md:p-8">
        <!-- router-view è dove Vue Router caricherà il componente DocPage -->
        <router-view />
      </main>
    </div>

    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import SiteHeader from '@/components/SiteHeader.vue';
import SiteFooter from '@/components/SiteFooter.vue';
// 1. Importa il menu.json da /src invece di fare fetch
import menuData from '@/menu.json';

const sidebarOpen = ref(false);
// 2. Assegna i dati importati direttamente alla ref
const pages = ref(menuData);
const accordionState = ref({});
const route = useRoute();

// Funzione per espandere/comprimere l'accordion
const toggleAccordion = (categoryPath) => {
  // Comportamento accordion: chiudi gli altri quando ne apri uno
  Object.keys(accordionState.value).forEach(key => {
    if (key !== categoryPath) {
      accordionState.value[key] = false;
    }
  });
  // Inverti lo stato di quello cliccato
  accordionState.value[categoryPath] = !accordionState.value[categoryPath];
};

// Funzione per impostare lo stato dell'accordion in base alla rotta attuale
const setAccordionFromRoute = (currentRoute) => {
  // Estrai la categoria dall'URL (es. /cri-trasporti/install -> cri-trasporti)
  const currentCategoryPath = currentRoute.path.split('/')[1];
  if (currentCategoryPath) {
    // Chiudi tutti...
    Object.keys(accordionState.value).forEach(key => {
      accordionState.value[key] = false;
    });
    // ...e apri solo quello corretto
    accordionState.value[currentCategoryPath] = true;
  }
};

// 3. Rimuoviamo onMounted.
// Usiamo un 'watch' sulla rotta per due scopi:
// 1. Chiudere la sidebar quando l'utente naviga (su mobile)
// 2. Aprire la categoria corretta nell'accordion
// 'immediate: true' fa sì che questo watch venga eseguito subito al caricamento
// della pagina, gestendo i link diretti.
watch(route, (newRoute) => {
  sidebarOpen.value = false; // Chiudi sidebar su navigazione
  setAccordionFromRoute(newRoute); // Apri accordion corretto
}, { immediate: true });
</script>
