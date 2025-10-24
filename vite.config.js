import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // <-- Importa il modulo 'path'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const repoName = env.GITHUB_REPOSITORY ? env.GITHUB_REPOSITORY.split('/')[1] : '/'

  return {
    plugins: [vue()],
    base: mode === 'production' ? `/${repoName}/` : '/',
    
    // --- AGGIUNTA ---
    // Aggiungi questo blocco per dire a Vite
    // che '@' significa './src'
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // --- FINE AGGIUNTA ---
  }
})