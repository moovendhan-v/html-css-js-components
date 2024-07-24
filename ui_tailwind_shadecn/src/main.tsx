
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './components/theme-provider.tsx';
import { Toaster } from '@/components/ui/sonner';
import AuthProvider from '@/components/AuthProvide.tsx'; // Ensure correct path to AuthProvider


createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
      <Toaster />
    </ThemeProvider>
  </AuthProvider>
);


// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <AuthProvider>
//     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       <App />
//       <Toaster />
//     </ThemeProvider>
//   </AuthProvider>
// );
