<template>
  <div class="flex flex-col min-h-screen bg-white text-gray-900 font-sans">
    
    <!-- Header -->
    <SiteHeader v-model:sidebarOpen="sidebarOpen" />

    <!-- Contenuto Principale -->
    <div class="flex flex-1 container mx-auto pt-16">
      
      <!-- Sidebar (Navigazione) -->
      <aside 
        class="fixed inset-y-0 left-0 z-30 w-64 bg-gray-50 border-r border-gray-200 transform transition-transform duration-300 ease-in-out pt-16 lg:translate-x-0 lg:sticky lg:top-16 lg:flex-shrink-0"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
        style="height: calc(100vh - 4rem);"
      >
        <div class="p-4 overflow-y-auto h-full">
          <nav>
            <ul>
              <li v-for="category in categories" :key="category.path" class="mb-4">
                <!-- Categoria "cliccabile" per l'accordion -->
                <button 
                  @click="toggleCategory(category.path)" 
                  class="flex justify-between items-center w-full text-left font-semibold text-lg text-gray-800 hover:text-red-700 mb-2"
                >
                  {{ category.name }}
                  <svg 
                    class="w-4 h-4 transition-transform" 
                    :class="{ 'rotate-180': openCategories.includes(category.path) }" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                <!-- Elenco dei file (visibile solo se la categoria è aperta) -->
                <ul v-show="openCategories.includes(category.path)" class="ml-4 space-y-2">
                  <li v-for="file in category.files" :key="file.slug">
                    <router-link
                      :to="`/docs/${category.path}/${file.slug}`"
                      class="block text-gray-600 hover:text-red-700 transition-colors"
                      active-class="font-semibold text-red-700"
                      @click="sidebarOpen = false"
                    >
                      {{ file.name }}
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <!-- Overlay per chiudere la sidebar su mobile -->
      <div 
        v-if="sidebarOpen" 
        class="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
        @click="sidebarOpen = false"
      ></div>

      <!-- Area Contenuto (dove viene caricato DocPage.vue) -->
      <main class="flex-1 p-6 lg:p-10 overflow-y-auto" style="max-height: calc(100vh - 4rem);">
        <!-- RouterView riceve i props dal router e li passa a DocPage -->
        <router-view v-slot="{ Component, route }">
          <component 
            :is="Component" 
            :key="route.path" 
            :category="route.params.category" 
            :slug="route.params.slug" 
          />
        </router-view>
      </main>

    </div>
    
    <!-- Footer -->
    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import SiteHeader from '@/components/SiteHeader.vue';
import SiteFooter from '@/components/SiteFooter.vue';

const route = useRoute();
const sidebarOpen = ref(false); // Sidebar chiusa di default su mobile
const categories = ref([]); // Menu
const openCategories = ref([]); // Lista delle categorie "aperte" nell'accordion

// Funzione per l'accordion
function toggleCategory(categoryPath) {
  const index = openCategories.value.indexOf(categoryPath);
  if (index > -1) {
    openCategories.value.splice(index, 1); // Chiude
  } else {
    openCategories.value.push(categoryPath); // Apre
  }
}

// Carica il menu.json generato dallo script
async function fetchMenu() {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}docs/menu.json`);
    if (!response.ok) throw new Error('menu.json non trovato');
    const menuData = await response.json();
    
    // Converte l'oggetto in un array per v-for
    categories.value = Object.keys(menuData).map(key => ({
      path: key,
      name: menuData[key].name,
      files: menuData[key].files,
    }));
    
    // Controlla la rotta attuale e apre la categoria corrispondente
    const currentCategory = route.params.category;
    if (currentCategory && !openCategories.value.includes(currentCategory)) {
      openCategories.value.push(currentCategory);
    }
    
  } catch (error) {
    console.error("Errore nel caricamento del menu:", error);
  }
}

onMounted(() => {
  fetchMenu();
});
</script>