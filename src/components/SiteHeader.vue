<template>
  <header class="bg-white shadow-sm sticky top-0 z-40">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center gap-4">
      <!-- Logo -->
      <router-link to="/" class="flex items-center space-x-2 flex-shrink-0">
        <img src="https://crive.b-cdn.net/wp-content/uploads/2024/09/h60-scuro-1.png" alt="Logo CRI Venezia" class="h-10 w-auto">
        <span class="text-lg font-bold text-gray-700 hidden sm:block">Documentazione</span>
      </router-link>

      <!-- Navigazione Desktop (Sempre visibile) -->
      <nav class="hidden md:flex items-center space-x-4 flex-shrink min-w-0">
        <router-link v-for="category in menu" :key="category.path"
                     :to="getFirstFileUrl(category)"
                     class="font-medium text-gray-600 hover:text-cri-red transition-colors truncate">
          {{ category.category }}
        </router-link>
      </nav>

      <!--
        MODIFICA: Aggiunta la barra di ricerca
      -->
      <div ref="searchContainer" class="relative w-full max-w-xs ml-auto">
        <div class="relative group">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cri-red transition-colors">
            <font-awesome-icon icon="search" />
          </span>
          <input
              type="text"
              placeholder="Cerca..."
              v-model="searchQuery"
              @focus="isSearchOpen = true"
              class="w-full pl-10 pr-4 py-2 text-sm text-gray-700 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-cri-red focus:bg-white"
          />
        </div>

        <!-- Dropdown Risultati Ricerca -->
        <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
          <div
              v-if="isSearchOpen && searchResults.length > 0"
              class="absolute top-full mt-2 w-full max-h-96 overflow-y-auto bg-white rounded-md shadow-lg border border-gray-200 z-50"
          >
            <ul>
              <li v-for="result in searchResults" :key="result.link">
                <router-link
                    :to="result.link"
                    @click="closeSearch"
                    class="block w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors"
                >
                  <span class="block font-medium text-gray-800">{{ result.name }}</span>
                  <span class="block text-sm text-gray-500">{{ result.categoryName }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </transition>
      </div>

      <!-- Pulsanti Menu Mobile -->
      <div class="flex md:hidden">
        <button v-if="!isHomePage" @click="$emit('toggle-sidebar')" class="p-2 text-gray-600 hover:text-cri-red">
          <font-awesome-icon :icon="sidebarOpen ? 'xmark' : 'bars'" class="w-6 h-6" />
        </button>
        <button v-if="isHomePage" @click="showMobileMenu = !showMobileMenu" class="p-2 text-gray-600 hover:text-cri-red">
          <font-awesome-icon :icon="showMobileMenu ? 'xmark' : 'bars'" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Menu a tendina Mobile (solo su Home) -->
    <div v-if="isHomePage && showMobileMenu" class="md:hidden bg-white shadow-lg pb-4">
      <nav class="flex flex-col space-y-2 px-4">
        <router-link v-for="category in menu" :key="category.path"
                     :to="getFirstFileUrl(category)"
                     @click="showMobileMenu = false"
                     class="block py-2 px-3 rounded font-medium text-gray-600 hover:bg-gray-100 hover:text-cri-red transition-colors">
          {{ category.category }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
// MODIFICA: Importazioni aggiuntive
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import menuData from '@/menu.json';

// Props per gestire lo stato della sidebar
defineProps({
  sidebarOpen: {
    type: Boolean,
    default: false
  }
});
defineEmits(['toggle-sidebar']);

const route = useRoute();
const menu = ref(menuData);
const showMobileMenu = ref(false);

// Controlla se siamo sulla homepage
const isHomePage = computed(() => route.path === '/');

// --- MODIFICA: Logica di Ricerca ---
const searchContainer = ref(null); // Ref per il click-outside
const searchQuery = ref('');
const isSearchOpen = ref(false);

// Funzione ricorsiva per cercare nei file
const searchInItems = (items) => {
  let results = [];
  const query = searchQuery.value.toLowerCase();

  for (const item of items) {
    if (item.type === 'file' && item.name.toLowerCase().includes(query)) {
      results.push(item);
    } else if (item.type === 'group') {
      // Cerca ricorsivamente nei gruppi
      results = results.concat(searchInItems(item.items));
    }
  }
  return results;
};

const searchResults = computed(() => {
  if (searchQuery.value.length < 2) {
    return [];
  }

  const allResults = [];
  const query = searchQuery.value.toLowerCase();

  for (const category of menuData) {
    // Cerca anche nel nome della categoria
    if (category.category.toLowerCase().includes(query)) {
      // Aggiungi tutti i file di questa categoria
      const flatFiles = getFlatFiles(category.items);
      for (const file of flatFiles) {
        allResults.push({
          name: file.name,
          categoryName: category.category,
          link: `/docs/${category.path}/${file.path.replace('.md', '')}`
        });
      }
    } else {
      // Cerca nei singoli file
      const foundItems = searchInItems(category.items);
      for (const item of foundItems) {
        allResults.push({
          name: item.name,
          categoryName: category.category,
          link: `/docs/${category.path}/${item.path.replace('.md', '')}`
        });
      }
    }
  }

  // Rimuovi duplicati (se una categoria e un file matchano)
  return [...new Map(allResults.map(item => [item.link, item])).values()];
});

// Funzione helper per appiattire i file di un gruppo
const getFlatFiles = (items) => {
  let files = [];
  for (const item of items) {
    if (item.type === 'file') {
      files.push(item);
    } else if (item.type === 'group') {
      files = files.concat(getFlatFiles(item.items));
    }
  }
  return files;
};

const closeSearch = () => {
  isSearchOpen.value = false;
  searchQuery.value = '';
};

// Logica per chiudere il dropdown cliccando fuori
const handleClickOutside = (event) => {
  if (searchContainer.value && !searchContainer.value.contains(event.target)) {
    isSearchOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
// --- Fine Logica di Ricerca ---


// Funzione helper per il link "Inizia a leggere"
function getFirstFileUrl(category) {
  if (category.items && category.items.length > 0) {
    const firstFile = category.items[0];
    if (firstFile.type === 'file') {
      const fileName = firstFile.path.replace('.md', '');
      return `/docs/${category.path}/${fileName}`;
    }
  }
  return '#';
}
</script>