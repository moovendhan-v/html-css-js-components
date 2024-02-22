import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'html-css-js-components/ui/', // Set your base URL if your site is hosted in a subdirectory, otherwise, use '/'
  build: {
    outDir: 'build', // Specify the output directory for the production build
    emptyOutDir: true, // Ensure that the output directory is empty before building
  },
  server: {
    host: true,
  },
})
