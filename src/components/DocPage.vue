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

// !!! INSERISCI QUI L'URL BASE DEL TUO CDN (assicurati che termini con uno slash '/') !!!
const CDN_URL = 'https://TUA_PULLZONE_URL/'; 

const route = useRoute();
const content = ref('');
let lightboxInstance = null;

// --- MODIFICA: Creato l'oggetto RegExp per evitare errori del parser ---
// Questa regex controlla se un URL è assoluto (http, https, data:, //)
const absoluteUrlRegex = new RegExp('^(https|http|data:|/{2})', 'i');
// -------------------------------------------------------------------

// Configurazione GLightbox e renderer per marked
const renderer = new marked.Renderer();

renderer.image = (href, title, text) => {
  let finalHref = href;

  // --- MODIFICA: Usa la variabile regex invece della sintassi /.../ ---
  if (!absoluteUrlRegex.test(href)) {
    // È un percorso relativo, anteponi il CDN_URL
    finalHref = CDN_URL + href.replace(/^\.?\//, '');
  }
  // ---------------------------------------------------------------

  // Avvolge l'immagine in un link per GLightbox
  return `
    <a href="${finalHref}" class="glightbox" data-gallery="doc-images">
      <img src="${finalHref}" alt="${text}" title="${title || ''}" class="rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer">
    </a>
  `;
};

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