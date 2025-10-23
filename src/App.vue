<script setup>
import { ref, onMounted } from 'vue' // Importiamo onMounted
import { RouterLink, RouterView } from 'vue-router'

// Stato per il menu mobile
const isMobileMenuOpen = ref(false)

// Rimuoviamo i dati hardcodati. Verranno caricati
const pages = ref([])
const openCategories = ref({})

// Metodo per caricare il menu
onMounted(async () => {
  try {
    // Vite serve i file da /public/ alla root /
    const response = await fetch('/menu.json')
    if (!response.ok) throw new Error('menu.json non trovato')
    
    const menuData = await response.json()
    pages.value = menuData
    
    // Inizializza dinamicamente le categorie (apri 'Generale' di default)
    menuData.forEach(group => {
      openCategories.value[group.category] = group.path === 'generale'
    })

  } catch (error) {
    console.error('Impossibile caricare il menu:', error)
    // Puoi gestire un errore UI qui se preferisci
  }
})


// Definiamo la struttura delle pagine
// NOTA: 'file' ora non ha l'estensione .md, perché fa parte dell'URL
// RIMOSSO L'ARRAY 'pages' STATICO

// Metodi per gestire la UI
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}

const toggleCategory = (categoryName) => {
  if (openCategories.value[categoryName] === undefined) {
    openCategories.value[categoryName] = false
  }
  openCategories.value[categoryName] = !openCategories.value[categoryName]
}
</script>

<template>
  <div class="flex flex-col md:flex-row min-h-screen">
      
    <!-- 1. Header Mobile -->
    <header class="md:hidden flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-10">
      <img src="https://crive.b-cdn.net/wp-content/uploads/2024/09/h60-scuro-1.png" alt="Logo" class="h-8" onerror="this.style.display='none'">
      <button @click="toggleMobileMenu" class="p-2 rounded-md text-gray-600 hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </header>

    <!-- 2. Overlay Mobile -->
    <div v-if="isMobileMenuOpen" @click="toggleMobileMenu" class="fixed inset-0 bg-black/50 z-20 md:hidden"></div>

    <!-- 3. Sidebar di Navigazione -->
    <nav class="fixed top-0 left-0 w-72 bg-white shadow-lg p-6 h-screen z-30
                transform transition-transform duration-300 ease-in-out
                md:w-72 md:h-screen md:fixed md:translate-x-0 md:z-0"
          :class="{ 'translate-x-0': isMobileMenuOpen, '-translate-x-full': !isMobileMenuOpen }">
      
      <div class="mb-4 text-center hidden md:block">
        <img src="https://crive.b-cdn.net/wp-content/uploads/2024/09/h60-scuro-1.png" alt="Logo" class="h-10 inline-block" onerror="this.style.display='none'">
      </div>
      <h1 class="text-3xl font-bold mb-6 text-blue-600 text-center hidden md:block">CRI Venezia - Documentazione</h1>
      
      <div class="flex justify-between items-center mb-6 md:hidden">
        <h2 class="text-xl font-bold text-blue-600">Menu</h2>
        <button @click="toggleMobileMenu" class="p-2 rounded-md text-gray-600 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Gruppi di navigazione (logica accordion) -->
      <!-- Questo v-for ora legge da 'pages.value' (il ref) -->
      <div v-for="group in pages" :key="group.category" class="mb-2">
        <button @click="toggleCategory(group.category)" 
                class="flex items-center justify-between w-full text-left text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
          <span>{{ group.category }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" 
                :class="['w-4 h-4 transform transition-transform', openCategories[group.category] ? 'rotate-180' : 'rotate-0']">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
        
        <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 -translate-y-2"
            enter-to-class="transform opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 translate-y-0"
            leave-to-class="transform opacity-0 -translate-y-2"
        >
          <ul v-if="openCategories[group.category]" class="pl-3">
            <li v-for="page in group.files" :key="page.file" class="mb-2">
              <!-- 
                Usiamo <router-link> invece di <a>
                'to' costruisce l'URL, es. /cri-trasporti/install
              -->
              <router-link
                :to="'/' + group.path + '/' + page.file"
                @click="closeMobileMenu"
                class="block w-full text-left p-3 rounded-lg transition-colors duration-200 text-sm text-gray-700 hover:bg-gray-100">
                {{ page.title }}
              </router-link>
            </li>
          </ul>
        </transition>
      </div>

    </nav>

    <!-- 4. Contenuto Principale -->
    <main class="flex-1 p-6 sm:p-10 md:pl-80">
      <!-- 
        <router-view> renderizzerà il componente DocPage.vue
        corrispondente alla rotta corrente.
      -->
      <RouterView />
    </main>
  </div>
</template>