import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "./components/theme-provider.tsx"
import { Toaster } from "@/components/ui/sonner"
import AuthProvider from "@/components/AuthProvide.tsx"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <AuthProvider>
      <App />
      <Toaster />
    </AuthProvider>
  </ThemeProvider>
)


