<template>
  <!-- Sfondo più scuro -->
  <footer class="p-6 bg-gray-900 text-gray-400">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      
      <!-- Sezione Sinistra: Copyright & Cloudflare -->
      <div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        <div class="text-sm text-center md:text-left">
          © {{ new Date().getFullYear() }} Croce Rossa Italiana - Comitato di Venezia
        </div>
        
        <div class="flex items-center space-x-2 text-sm">
          <span class="text-gray-500">Runs on Cloudflare®</span>
          <img :src="cloudflareLogo" alt="Cloudflare Logo" class="h-5 w-auto filter grayscale opacity-60">
        </div>
      </div>

      <!-- Sezione Destra: Icone Social -->
      <div class="flex space-x-6">
        
        <a href="https://www.facebook.com/CRIVenezia" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors" aria-label="Facebook">
          <font-awesome-icon :icon="['fab', 'facebook']" class="w-5 h-5" />
        </a>
        
        <a href="https://www.instagram.com/cri.venezia" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors" aria-label="Instagram">
          <font-awesome-icon :icon="['fab', 'instagram']" class="w-5 h-5" />
        </a>

        <a href="https://crivenezia.it" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors" aria-label="Sito Web CRI Venezia">
          <font-awesome-icon icon="globe" class="w-5 h-5" />
        </a>
        
        <a href="https://github.com/CRIVenezia" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors" aria-label="GitHub">
          <font-awesome-icon :icon="['fab', 'github']" class="w-5 h-5" />
        </a>

      </div>
    </div>
  </footer>
</template>

<script setup>
import cloudflareLogo from '@/assets/images/cloudflare-logo.png';
</script>