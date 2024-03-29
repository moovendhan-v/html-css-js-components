import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // '~': path.resolve(__dirname, './src'),
      "~": path.resolve(__dirname, "./src/components/custom_ui"),
      'monaco-editor': 'monaco-editor/esm/vs/editor/editor.api.js'
    },
  },
})
