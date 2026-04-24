import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  root: 'prototypes',
  base: '/prototypes/',
  build: {
    outDir: '../dist-showcase/prototypes',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        pagination: resolve(__dirname, 'prototypes/pagination/index.html'),
        'popup-qa': resolve(__dirname, 'prototypes/popup-qa/index.html'),
        'searchbar-case': resolve(__dirname, 'prototypes/searchbar-case/index.html'),
        'searchbar-finance': resolve(__dirname, 'prototypes/searchbar-finance/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      'igt-design-system': resolve(__dirname, 'src/index.ts'),
    },
  },
})
