import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  root: 'showcase',
  build: {
    outDir: '../dist-showcase',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      'igt-design-system': resolve(__dirname, 'src/index.ts'),
    },
  },
  server: {
    open: true,
  },
})
