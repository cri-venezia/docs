<template>
  <header class="bg-white shadow-md z-30 h-16">
    <div class="container mx-auto px-4 h-full flex justify-between items-center">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <img 
          src="https://crive.b-cdn.net/wp-content/uploads/2024/09/h60-scuro-1.png" 
          alt="Logo CRI Venezia" 
          class="h-10 w-auto"
        >
      </div>

      <!-- Pulsante Hamburger per Mobile -->
      <button
        @click="$emit('toggleSidebar')"
        class="md:hidden p-2 text-gray-600 hover:text-gray-900"
        aria-label="Toggle navigation"
      >
        <!-- Icona Hamburger -->
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup>
// Definisce l'evento che il componente può emettere
defineEmits(['toggleSidebar']);
</script>