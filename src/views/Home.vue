<template>
  <div class="container mx-auto p-4 md:p-8">
    <div class="text-center my-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Documentazione Plugin
      </h1>
      <p class="text-xl text-gray-600">
        Benvenuto nel portale della documentazione per i plugin sviluppati dal Comitato di Venezia.
      </p>
    </div>

    <div class="mt-16">
      <h2 class="text-2xl font-semibold text-gray-700 mb-6 text-center">Esplora le sezioni</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div v-for="category in categories" :key="category.path" 
             class="bg-cri-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
          
          <h3 class="text-xl font-bold text-red-700 mb-3">{{ category.category }}</h3>
          <p class="text-gray-600 mb-4 h-20 overflow-hidden">
            Esplora la documentazione relativa a {{ category.category.toLowerCase() }}.
          </p>
          
          <!-- Linka al primo file della categoria (es. index.md) -->
          <router-link :to="getFirstFileUrl(category)"
                       class="inline-block font-medium text-cri-red hover:text-cri-red transition-colors">
            Inizia a leggere &rarr;
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// Importa gli stessi dati del menu usati dalla sidebar
import menuData from '@/menu.json'; 

// Usiamo solo le categorie per la homepage
const categories = ref(menuData);

function getFirstFileUrl(category) {
  if (category.files && category.files.length > 0) {
    const firstFile = category.files[0]; // Lo script ora ordina index.md per primo
    const fileName = firstFile.path.replace('.md', '');
    return `/docs/${category.path}/${fileName}`;
  }
  return '#'; // Fallback
}
</script>