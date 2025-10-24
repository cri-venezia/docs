import { defineConfig } from 'vite' // Rimosso loadEnv
import vue from '@vitejs/plugin-vue'
import path from 'path' 

export default defineConfig(({ mode }) => { // Semplificato
  
  // La logica GITHUB_REPOSITORY era per GitHub Pages.
  // Per Cloudflare Pages (e la maggior parte degli host), il base path è '/'.
  const base = mode === 'production' ? '/' : '/'

  return {
    plugins: [vue()],
    base: base, // Imposta la base corretta
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})

