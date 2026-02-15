
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// Fix: Import process from node:process to resolve "Property 'cwd' does not exist on type 'Process'" error
import process from 'node:process';

export default defineConfig(({ mode }) => {
  // Mevcut çalışma dizinindeki ortam değişkenlerini yükle
  // Üçüncü parametre '' (boş) olduğunda VITE_ ön eki olmayan değişkenleri de okur
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Sunucu ortamındaki (Vercel, Netlify, Github Actions vb.) veya .env dosyasındaki API_KEY'i yakala
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY || '')
    },
    server: {
      port: 3000
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});
