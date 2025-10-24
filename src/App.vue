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
            
            // MODIFICA: Aumentata la larghezza
            'w-80 bg-cri-white border-r border-gray-200 transition-transform transform', 
            
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          ]">
          
          <div class="py-6 px-4 overflow-y-auto h-full">
            <ul class="space-y-4">
              <li v-for="category in pages" :key="category.path">
                <h2 @click="toggleCategory(category.path)" 
                    class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 cursor-pointer hover:text-cri-red">
                  {{ category.category }}
                </h2>
                
                <div v-show="openCategories[category.path]">
                  <SidebarMenu
                    :items="category.items"
                    :category-path="category.path"
                    :open-groups="openSubGroups"
                    @navigate="isSidebarOpen = false"
                    @toggle-group="toggleSubGroup"
                  />
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Contenuto Principale -->
        <main :class="[
          'transition-all duration-300 w-full', 
          
          // MODIFICA: Aumentato il margine per corrispondere alla sidebar
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
const pages = ref(menuData);
const isSidebarOpen = ref(false);

// Stato per le categorie principali (es. "Cri Corsi")
const openCategories = ref({});
// Stato per i sottomenu (es. "Admin")
const openSubGroups = ref({});

// Controlla se siamo sulla homepage
const isHomePage = computed(() => route.path === '/');

// Logica per espandere/comprimere categorie principali
const toggleCategory = (categoryPath) => {
  openCategories.value[categoryPath] = !openCategories.value[categoryPath];
};

// Logica per espandere/comprimere sottomenu
const toggleSubGroup = (groupPath) => {
  openSubGroups.value[groupPath] = !openSubGroups.value[groupPath];
};

// Logica per aprire la categoria corretta in base all'URL
const setAccordionFromRoute = () => {
  const categoryPath = route.params.category;
  const filePath = route.params.file || '';

  if (categoryPath) {
    // Apri la categoria principale
    openCategories.value = { [categoryPath]: true };

    // Apri i sottomenu necessari per il file corrente
    const segments = filePath.split('/');
    if (segments.length > 1) {
      let currentPath = '';
      for (let i = 0; i < segments.length - 1; i++) {
        currentPath = currentPath ? `${currentPath}/${segments[i]}` : segments[i];
        openSubGroups.value[currentPath] = true;
      }
    }
  }
};

// Logica per chiudere la sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Osserva i cambiamenti di rotta per aggiornare l'accordion
watch(() => route.path, setAccordionFromRoute, { immediate: true });
</script>