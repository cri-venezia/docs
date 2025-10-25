<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    
    <SiteHeader :sidebar-open="isSidebarOpen" @toggle-sidebar="toggleSidebar" />

    <div class="flex-grow container mx-auto w-full">
      <div class="flex">
        
        <!-- Sidebar: mostrata solo se NON siamo sulla Home -->
        <nav 
          v-if="!isHomePage"
          :class="[
            'fixed md:sticky top-16 md:top-auto md:h-[calc(100vh-4rem)] z-30',
            'w-80 bg-cri-white border-r border-gray-200 transition-transform transform', 
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          ]">
          
          <div class="py-6 px-4 overflow-y-auto h-full">
            <!-- 
              MODIFICA: Rimossa la vecchia <ul> con v-for.
              Ora mostriamo solo la categoria corrente.
            -->
            <div v-if="currentCategory">
              
              <!-- 1. Titolo della Categoria (es. "Cri Corsi") -->
              <h2 class="text-lg font-bold text-gray-900 mb-4 px-3">
                {{ currentCategory.category }}
              </h2>
              
              <!-- 2. Il componente menu ricorsivo (ora al primo livello) -->
              <SidebarMenu
                :items="currentCategory.items"
                :category-path="currentCategory.path"
                :open-groups="openSubGroups"
                :is-root="true" 
                @navigate="isSidebarOpen = false"
                @toggle-group="toggleSubGroup"
              />
            </div>
          </div>
        </nav>

        <!-- Contenuto Principale -->
        <main :class="[
          'transition-all duration-300 w-full', 
          !isHomePage ? 'md:ml-80' : ''
        ]">
          <router-view />
        </main>

        <!-- Overlay mobile per la sidebar -->
        <div v-if="!isHomePage && isSidebarOpen" 
             @click="isSidebarOpen = false" 
             class="fixed inset-0 bg-black/30 z-20 md:hidden">
        </div>

      </div>
    </div>

    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import SiteHeader from '@/components/SiteHeader.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import SidebarMenu from '@/components/SidebarMenu.vue'; 
import menuData from '@/menu.json';

const route = useRoute();
const isSidebarOpen = ref(false);

// --- LOGICA MODIFICATA ---

// 1. Trova la categoria corrente basandosi sull'URL
const currentCategory = computed(() => {
  const categoryPath = route.params.category;
  if (!categoryPath) return null;
  // Cerca nel menu.json la categoria che corrisponde al path dell'URL
  return menuData.find(cat => cat.path === categoryPath);
});

// 2. Stato solo per i sottomenu (es. "Admin")
const openSubGroups = ref({});

// 3. Funzione per espandere/comprimere sottomenu
const toggleSubGroup = (groupPath) => {
  openSubGroups.value[groupPath] = !openSubGroups.value[groupPath];
};

// --- Rimossa la vecchia logica per 'pages' e 'openCategories' ---

// Controlla se siamo sulla homepage
const isHomePage = computed(() => route.path === '/');

// Logica per aprire i sottomenu corretti in base all'URL
const setAccordionFromRoute = () => {
  const filePath = route.params.file || '';
  
  // Resetta i gruppi aperti
  const newOpenSubGroups = {};

  // Apri i sottomenu necessari per il file corrente
  const segments = filePath.split('/');
  if (segments.length > 1) {
    let currentPath = '';
    // Itera su tutti i segmenti tranne l'ultimo (che è il file)
    for (let i = 0; i < segments.length - 1; i++) {
      currentPath = currentPath ? `${currentPath}/${segments[i]}` : segments[i];
      newOpenSubGroups[currentPath] = true; // Apri questo sottomenu
    }
  }
  openSubGroups.value = newOpenSubGroups;
};

// Logica per chiudere/aprire la sidebar (mobile)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Osserva i cambiamenti di rotta per aggiornare l'accordion
watch(() => route.path, setAccordionFromRoute, { immediate: true });
</script>