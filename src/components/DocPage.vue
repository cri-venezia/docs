<script setup>
import { ref, watchEffect, nextTick } from 'vue'
import { marked } from 'marked'
import GLightbox from 'glightbox'

// Questo componente riceve 'category' e 'page' come props dal router
const props = defineProps({
  category: {
    type: String,
    required: true
  },
  page: {
    type: String,
    required: true
  }
})

const renderedMarkdown = ref('<p class="text-xl text-gray-500">Caricamento...</p>')
let lightboxInstance = null

// Creiamo un renderer personalizzato per Marked per la lightbox
const markedRenderer = new marked.Renderer();
const originalImageRenderer = markedRenderer.image.bind(markedRenderer);

markedRenderer.image = (href, title, text) => {
  const imgHtml = originalImageRenderer(href, title, text);
  return `<a href="${href}" class="glightbox" data-gallery="page-gallery">${imgHtml}</a>`;
};

marked.use({ renderer: markedRenderer });

// Funzione per caricare e renderizzare il markdown
const loadContent = async (category, page) => {
  // Costruiamo il percorso del file .md
  // Nota: usiamo `/docs/...` che punta alla cartella 'public/docs'
  // I file in 'public' vengono copiati nella root del sito durante il build
  const fullPath = category ? `${category}/${page}.md` : `${page}.md`;
  const fileUrl = `/docs/${fullPath}`; // Modificato per Vite

  renderedMarkdown.value = '<p class="text-xl text-gray-500">Caricamento...</p>';
  
  try {
    const response = await fetch(fileUrl);
    
    if (!response.ok) {
      throw new Error(`Impossibile trovare il file ${fullPath}`);
    }
    
    const markdownText = await response.text();
    renderedMarkdown.value = marked.parse(markdownText);

    // Gestione Lightbox
    if (lightboxInstance) {
      lightboxInstance.destroy();
    }

    // Aspettiamo che Vue aggiorni il DOM
    await nextTick();
    
    // Re-inizializziamo GLightbox
    lightboxInstance = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      gallery: 'page-gallery'
    });

  } catch (error) {
    console.error('Errore nel caricamento della pagina:', error);
    renderedMarkdown.value = `<div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                                <h3 class="font-bold">Errore</h3>
                                <p>Impossibile caricare il file: <strong>${fullPath}</strong>.</p>
                                <p class="text-sm mt-2">Assicurati che il file esista nella cartella 'public/docs' e che il nome sia corretto.</p>
                              </div>`;
  }
}

// watchEffect reagisce ai cambiamenti delle props (category, page)
// e ricarica il contenuto
watchEffect(() => {
  if (props.page) {
    loadContent(props.category, props.page)
  }
})
</script>

<template>
  <!-- Il div 'prose' è dove iniettiamo l'HTML convertito -->
  <div class="prose max-w-none" v-html="renderedMarkdown"></div>
</template>