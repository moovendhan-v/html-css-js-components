import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dotenv from "dotenv";

// Load .env variables
const env = dotenv.config().parsed;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./src/components/custom_ui"),
      'monaco-editor': 'monaco-editor/esm/vs/editor/editor.api.js'
    },
  },
  define: {
    // Expose process.env variables to the client-side code
    'process.env': env
  }
});
