<template>
  <!-- La classe 'prose' di Tailwind formatta l'HTML generato -->
  <div class="prose max-w-none p-4 md:p-8" v-html="content"></div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
// CORREZIONE: Importa { marked } invece di 'marked' (named export)
import { marked } from 'marked'; 
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';

const route = useRoute();
const content = ref('');
let lightboxInstance = null;

// Configurazione GLightbox e renderer per marked
const renderer = new marked.Renderer();
renderer.image = (href, title, text) => {
  // Avvolge l'immagine in un link per GLightbox
  return `
    <a href="${href}" class="glightbox" data-gallery="doc-images">
      <img src="${href}" alt="${text}" title="${title || ''}" class="rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer">
    </a>
  `;
};

// Applica il renderer personalizzato
marked.use({ renderer });

const loadMarkdown = async () => {
  // Pulisci il contenuto se i parametri non sono validi
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
    // Usa 'await marked.parse()' per la versione asincrona (consigliato da v12)
    content.value = await marked.parse(markdown);

    // Re-inizializza GLightbox dopo che il DOM è stato aggiornato
    // Diamo un piccolo ritardo per assicurare che il v-html sia renderizzato
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

// Carica il markdown quando la rotta cambia (e al caricamento iniziale)
watch(
  () => route.path,
  loadMarkdown,
  { immediate: true }
);
</script>