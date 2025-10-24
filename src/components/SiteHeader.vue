<template>
  <header class="bg-white shadow-sm sticky top-0 z-40">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <!-- Logo -->
      <router-link to="/" class="flex items-center space-x-2">
        <img :src="logo" alt="Logo CRI Venezia" class="h-10 w-auto">
        <span class="text-lg font-bold text-gray-700 hidden sm:block">Documentazione</span>
      </router-link>

      <!-- Navigazione Desktop (solo su Home) -->
      <nav v-if="isHomePage" class="hidden md:flex space-x-6">
        <router-link v-for="category in menu" :key="category.path" 
                     :to="getFirstFileUrl(category)"
                     class="font-medium text-gray-600 hover:text-red-700 transition-colors">
          {{ category.category }}
        </router-link>
        <!-- Aggiungi qui la funzione di ricerca se necessario -->
      </nav>

      <!-- Pulsante Menu Mobile (NON su Home) -->
      <button v-if="!isHomePage" @click="$emit('toggle-sidebar')" class="md:hidden p-2 text-gray-600 hover:text-red-700">
        <font-awesome-icon :icon="sidebarOpen ? 'xmark' : 'bars'" class="w-6 h-6" />
      </button>

      <!-- Pulsante Menu Mobile (Su Home) -->
      <button v-if="isHomePage" @click="showMobileMenu = !showMobileMenu" class="md:hidden p-2 text-gray-600 hover:text-red-700">
        <font-awesome-icon :icon="showMobileMenu ? 'xmark' : 'bars'" class="w-6 h-6" />
      </button>
    </div>

    <!-- Menu a tendina Mobile (solo su Home) -->
    <div v-if="isHomePage && showMobileMenu" class="md:hidden bg-white shadow-lg pb-4">
      <nav class="flex flex-col space-y-2 px-4">
        <router-link v-for="category in menu" :key="category.path" 
                     :to="getFirstFileUrl(category)"
                     @click="showMobileMenu = false"
                     class="block py-2 px-3 rounded font-medium text-gray-600 hover:bg-gray-100 hover:text-red-700 transition-colors">
          {{ category.category }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import logo from '@/assets/logo-cri.png'; // Assicurati di avere il logo in 'src/assets/'
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

// Funzione helper per il link "Inizia a leggere"
function getFirstFileUrl(category) {
  if (category.files && category.files.length > 0) {
    const firstFile = category.files[0];
    const fileName = firstFile.path.replace('.md', '');
    return `/docs/${category.path}/${fileName}`;
  }
  return '#';
}
</script>