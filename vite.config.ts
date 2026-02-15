
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // process.env.API_KEY'i derleme aşamasında enjekte eder. 
    // Vercel/Netlify gibi ortamlarda bu değişkenin BUILD sırasında mevcut olması gerekir.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
