<template>
  <footer class="p-4 bg-[hsla(225,15%,10%,0.07)] text-gray-600">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      
      <!-- Left Side: Copyright & Cloudflare --><div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        <!-- Copyright Text --><div class="text-sm text-center md:text-left">
          © {{ new Date().getFullYear() }} Croce Rossa Italiana - Comitato di Venezia
        </div>
        
        <!-- Cloudflare --><div class="flex items-center space-x-2 text-sm">
          <span class="text-gray-500">Runs on Cloudflare®</span>
          <!-- L'immagine viene caricata dalla variabile importata --><img :src="cloudflareLogo" alt="Cloudflare Logo" class="h-5 w-auto">
        </div>
      </div>

      <!-- Social Icons --><div class="flex space-x-6">
        
        <!-- Facebook --><a href="https://www.facebook.com/crivenezia/" target="_blank" rel="noopener noreferrer" class="hover:text-red-700 transition-colors" aria-label="Facebook">
          <span class="sr-only">Facebook</span>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
          </svg>
        </a>
        
        <!-- Instagram --><a href="https://www.instagram.com/cri_venezia" target="_blank" rel="noopener noreferrer" class="hover:text-red-700 transition-colors" aria-label="Instagram">
          <span class="sr-only">Instagram</span>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C8.74 2 8.333.015 6.85.07 5.305.127 4.54.31 3.815.59A4.89 4.89 0 00.59 3.815C.31 4.54.127 5.305.07 6.85.015 8.333 0 8.74 0 12s.015 3.667.07 5.15c.057 1.545.25 2.31.535 3.035a4.89 4.89 0 003.21 3.21c.725.285 1.49.478 3.035.535C8.333 23.985 8.74 24 12 24s3.667-.015 5.15-.07c1.545-.057 2.31-.25 3.035-.535a4.89 4.89 0 003.21-3.21c.285-.725.478-1.49.535-3.035C23.985 15.667 24 15.26 24 12s-.015-3.667-.07-5.15c-.057-1.545-.25-2.31-.535-3.035a4.89 4.89 0 00-3.21-3.21c-.725-.285-1.49-.478-3.035-.535C15.667 2.015 15.26 2 12 2zm0 1.8a9.15 9.15 0 015.02.14c1.4.05 1.95.23 2.39.4.5.18.9.4 1.3.8s.62.8.8 1.3c.17.44.35 1 .4 2.39.09 1.4.14 1.8.14 5.02s-.05 3.62-.14 5.02c-.05 1.4-.23 1.95-.4 2.39a3.09 3.09 0 01-.8 1.3 3.09 3.09 0 01-1.3.8c-.44.17-1 .35-2.39.4-1.4.09-1.8.14-5.02.14s-3.62-.05-5.02-.14c-1.4-.05-1.95-.23-2.39-.4a3.09 3.09 0 01-1.3-.8 3.09 3.09 0 01-.8-1.3c-.17-.44-.35-1-.4-2.39-.09-1.4-.14-1.8-.14-5.02s.05-3.62.14-5.02c.05-1.4.23 1.95.4-2.39.18-.5.4-.9.8-1.3s.8-.62 1.3-.8c.44-.17 1-.35 2.39-.4C8.38 3.85 8.79 3.8 12 3.8zm0 3.6A4.6 4.6 0 1012 17a4.6 4.6 0 000-9.2zm0 7.4A2.8 2.8 0 1112 9.2a2.8 2.8 0 010 5.6zm6.3-7.5a1.1 1.1 0 100-2.2 1.1 1.1 0 000 2.2z" clip-rule="evenodd" />
          </svg>
        </a>

        <!-- Sito Web (Icona Globo) --><a href="https://crivenezia.it" target="_blank" rel="noopener noreferrer" class="hover:text-red-700 transition-colors" aria-label="Sito Web CRI Venezia">
          <span class="sr-only">Sito Web</span>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.75H9.75A.75.75 0 009 7.5v9a.75.75 0 00.75.75h2.25V18a.75.75 0 001.5 0v-.75h.75a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75h-.75V6zM15 9a.75.75 0 00-1.5 0v.75H12a.75.75 0 00-.75.75v3a.75.75 0 00.75.75h1.5V15a.75.75 0 001.5 0v-.75h.75a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-.75V9z" clip-rule="evenodd" />
            <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.75H9.75A.75.75 0 009 7.5v9a.75.75 0 00.75.75h2.25V18a.75.75 0 001.5 0v-.75h.75a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75h-.75V6zM15 9a.75.75 0 00-1.5 0v.75H12a.75.75 0 00-.75.75v3a.75.75 0 00.75.75h1.5V15a.75.75 0 001.5 0v-.75h.75a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-.75V9z" />
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.75H9.75A.75.75 0 009 7.5v9a.75.75 0 00.75.75h2.25V18a.75.75 0 001.5 0v-.75h.75a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75h-.75V6zM15 9a.75.75 0 00-1.5 0v.75H12a.75.75 0 00-.75.75v3a.75.75 0 00.75.75h1.5V15a.75.75 0 001.5 0v-.75h.75a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-.75V9z" clip-rule="evenodd" />
            <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.75H9.75A.75.75 0 009 7.5v9a.75.75 0 00.75.75h2.25V18a.75.75 0 001.5 0v-.75h.75a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75h-.75V6zM15 9a.75.75 0 00-1.5 0v.75H12a.75.75 0 00-.75.75v3a.75.75 0 00.75.75h1.5V15a.75.75 0 001.5 0v-.75h.75a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-.75V9z" />
          </svg>
        </a>
        
        <!-- GitHub --><a href="https://github.com/cri-venezia" target="_blank" rel="noopener noreferrer" class="hover:text-red-700 transition-colors" aria-label="GitHub">
          <span class="sr-only">GitHub</span>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.418 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.007-.866-.013-1.703-2.782.605-3.367-1.34-3.367-1.34-.454-1.157-1.11-1.463-1.11-1.463-.905-.619.069-.605.069-.605 1.007.07 1.532 1.03 1.532 1.03.89 1.529 2.341 1.087 2.91.829.091-.645.351-1.087.636-1.332-2.22-.251-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.251-.446-1.27.098-2.652 0 0 .84-.269 2.75 1.025A9.646 9.646 0 0112 6.666c.84-.008 1.68.11 2.478.329 1.91-1.295 2.75-1.025 2.75-1.025.546 1.382.202 2.401.099 2.652.64.698 1.028 1.591 1.028 2.682 0 3.841-2.339 4.681-4.566 4.933.359.309.678.919.678 1.855 0 1.332-.012 2.41-.012 2.727 0 .268.18.579.688.482C21.137 20.198 24 16.43 24 12.017 24 6.484 19.523 2 14 2h-2z" clip-rule="evenodd" />
          </svg>
        </a>

      </div>
    </div>
  </footer>
</template>

<script setup>
// Importa l'immagine come una variabile.
// Vite la gestirà automaticamente durante il build.
import cloudflareLogo from '@/assets/images/cloudflare-logo.png';
</script>