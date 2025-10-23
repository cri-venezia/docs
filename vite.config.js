import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  
  // Determina la base URL
  // 1. In produzione (build), usa la variabile d'ambiente GITHUB_REPOSITORY_NAME
  // 2. In sviluppo (dev), usa la root '/'
  const base = mode === 'production' && process.env.GITHUB_REPOSITORY_NAME
    ? `/${process.env.GITHUB_REPOSITORY_NAME}/`
    : '/'

  return {
    plugins: [
      vue(),
    ],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    base: base, // Imposta la base URL dinamicamente
  }
})