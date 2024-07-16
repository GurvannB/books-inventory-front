import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_URL
        }
      }
    },
    build: {
      outDir: 'build',
    },
    plugins: [react()]
  }
});