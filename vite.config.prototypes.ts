import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  root: 'prototypes',
  resolve: {
    alias: {
      'igt-design-system': resolve(__dirname, 'src/index.ts'),
    },
  },
  server: {
    open: true,
  },
})
