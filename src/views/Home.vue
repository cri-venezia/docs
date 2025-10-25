<template>
  <div class="container mx-auto p-4 md:p-8">
    <!-- TUA MODIFICA: Testo aggiornato -->
    <div class="text-center my-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Portale Documentazione dei Plugin
      </h1>
      <p class="text-xl text-gray-600">
        Benvenuto/a nel portale della documentazione per i plugin sviluppati dal Comitato di Venezia.
      </p>
    </div>

    <div class="mt-16">
      <h2 class="text-2xl font-semibold text-gray-700 mb-6 text-center">Esplora le sezioni</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <!-- TUA MODIFICA: bg-cri-white -->
        <div v-for="category in categories" :key="category.path"
             class="bg-cri-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-100">

          <!-- TUA MODIFICA: Link sul titolo -->
          <router-link :to="getFirstFileUrl(category)">
            <h3 class="text-xl font-bold text-cri-red mb-3">{{ category.category }}</h3>
          </router-link>

          <!-- MIA MODIFICA: Carica la descrizione dal frontmatter -->
          <p class="text-gray-600 mb-4 h-20 overflow-hidden">
            {{ getCategoryDescription(category) }}
          </p>

          <!-- Link "Inizia a leggere" (invariato) -->
          <router-link :to="getFirstFileUrl(category)"
                       class="inline-block font-medium text-cri-red hover:text-red-800 transition-colors">
            Inizia a leggere &rarr;
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import menuData from '@/menu.json';

const categories = ref(menuData);

// --- MIA MODIFICA ---
// Funzione per leggere la descrizione dal menu.json (dal frontmatter)
const getCategoryDescription = (category) => {
  if (!category.items || category.items.length === 0) {
    return 'Documentazione non ancora disponibile.';
  }
  // Cerca 'index.md'
  const indexFile = category.items.find(item => item.isIndex && item.type === 'file');

  if (indexFile && indexFile.description) {
    return indexFile.description;
  }

  // Fallback (uso il tuo testo di fallback)
  return `Esplora la documentazione relativa a ${category.category.toLowerCase()}.`;
};
// --- FINE MODIFICA ---


// Funzione 'getFirstFileUrl' (corretta da entrambi)
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