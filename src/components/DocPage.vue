<template>
  <!-- La classe 'prose' di Tailwind formatta l'HTML generato -->
  <div class="prose max-w-none p-4 md:p-8" v-html="content"></div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked'; 
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';

// --- MODIFICA ---
// Rimossa la costante CDN_URL e la variabile absoluteUrlRegex
// ----------------

const route = useRoute();
const content = ref('');
let lightboxInstance = null;

// Configurazione GLightbox e renderer per marked
const renderer = new marked.Renderer();

// --- MODIFICA ---
// La logica del CDN è stata rimossa.
// 'href' ora viene usato così com'è.
renderer.image = (href, title, text) => {
  // Si assume che 'href' sia un percorso root-relativo (es. /docs/images/foto.png)
  const finalHref = href; 

  // Avvolge l'immagine in un link per GLightbox
  return `
    <a href="${finalHref}" class="glightbox" data-gallery="doc-images">
      <img src="${finalHref}" alt="${text}" title="${title || ''}" class="rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer">
    </a>
  `;
};
// ------------------------------------------

// Applica il renderer personalizzato
marked.use({ renderer });

const loadMarkdown = async () => {
  if (!route.params.category || !route.params.file) {
    content.value = '';
    return;
  }

  try {
    const docPath = `/docs/${route.params.category}/${route.params.file}.md`;
    const response = await fetch(docPath);
    
    if (!response.ok) {
      throw new Error(`File non trovato: ${response.statusText}`);
    }
    
    const markdown = await response.text();
    content.value = await marked.parse(markdown);

    // Re-inizializza GLightbox
    await new Promise(resolve => setTimeout(resolve, 0)); 
    
    if (lightboxInstance) {
      lightboxInstance.destroy();
    }
    lightboxInstance = GLightbox({
      selector: '.glightbox'
    });

  } catch (error) {
    console.error('Errore nel caricamento del markdown:', error);
    content.value = `<p class="text-red-500">Impossibile caricare il documento: ${route.params.file}.md</p>`;
  }
};

// Carica il markdown quando la rotta cambia
watch(
  () => route.path,
  loadMarkdown,
  { immediate: true }
);
</script>