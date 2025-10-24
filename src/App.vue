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
            'w-64 bg-white border-r border-gray-200 transition-transform transform',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          ]">
          
          <div class="py-6 px-4 overflow-y-auto h-full">
            <ul class="space-y-4">
              <li v-for="category in pages" :key="category.path">
                <h2 @click="toggleCategory(category.path)" 
                    class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 cursor-pointer hover:text-gray-900">
                  {{ category.category }}
                </h2>
                <ul v-show="openCategories[category.path]" class="space-y-1 ml-2 border-l border-gray-200">
                  <li v-for="file in category.files" :key="file.path">
                    <router-link
                      :to="`/docs/${category.path}/${file.path.replace('.md', '')}`"
                      @click="isSidebarOpen = false"
                      class="block py-1.5 px-3 rounded text-gray-700 hover:bg-gray-100 transition-colors"
                      active-class="bg-red-50 text-red-700 font-medium">
                      {{ file.name }}
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Contenuto Principale -->
        <main :class="['transition-all duration-300 w-full', !isHomePage ? 'md:ml-64' : '']">
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
import menuData from '@/menu.json';

const route = useRoute();
const pages = ref(menuData);
const openCategories = ref({});
const isSidebarOpen = ref(false);

// Controlla se siamo sulla homepage
const isHomePage = computed(() => route.path === '/');

// Logica per espandere/comprimere categorie
const toggleCategory = (categoryPath) => {
  openCategories.value[categoryPath] = !openCategories.value[categoryPath];
};

// Logica per aprire la categoria corretta in base all'URL
const setAccordionFromRoute = () => {
  const categoryPath = route.params.category;
  if (categoryPath) {
    // Chiudi tutte le altre e apri quella corrente
    const newOpenCategories = {};
    newOpenCategories[categoryPath] = true;
    openCategories.value = newOpenCategories;
  }
};

// Logica per chiudere la sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Osserva i cambiamenti di rotta per aggiornare l'accordion
watch(() => route.path, setAccordionFromRoute, { immediate: true });
</script>